import * as React from 'react'
import { connect } from '@helpscout/wedux'
import propConnect from '../../PropProvider/propConnect'
import Animate from '../../Animate'
import Portal from '../../Portal'
import Card from './Dropdown.Card'
import Menu from './Dropdown.Menu'
import Group from './Dropdown.Group'
import Item from './Dropdown.Item'
import Renderer from './Dropdown.Renderer'
import {
  SELECTORS,
  getItemProps,
  hasGroups,
  isDropRight,
} from './Dropdown.utils'
import {
  closeDropdown,
  focusItem,
  onMenuMounted,
  onMenuReposition,
  onMenuUnmounted,
  selectItem,
} from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { renderRenderPropComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'
import { isBrowserEnv } from '../../../utilities/env'
import { createUniqueIDFactory } from '../../../utilities/id'
import { memoizeWithProps } from '../../../utilities/memoize'

const uniqueID = createUniqueIDFactory('DropdownMenuContainer')

export interface Props {
  animationDuration: number
  animationSequence: string
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  dropRight: boolean
  dropUp: boolean
  focusItem: (...args: any[]) => void
  getState: (...args: any[]) => void
  id?: string
  innerRef: (node: HTMLElement) => void
  isLoading: boolean
  isOpen: boolean
  items: Array<any>
  menuOffsetTop: number
  onMenuMounted: () => void
  onMenuReposition: (props: any) => void
  onMenuUnmounted: () => void
  positionFixed: boolean
  renderEmpty?: any
  renderLoading?: any
  selectItem: (...args: any[]) => void
  shouldDropDirectionUpdate: (Position: any) => boolean
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export class MenuContainer extends React.PureComponent<Props> {
  static defaultProps = {
    animationDuration: 80,
    animationSequence: 'fade down',
    closeDropdown: noop,
    dropRight: true,
    dropUp: false,
    focusItem: noop,
    getState: noop,
    innerRef: noop,
    isLoading: false,
    isOpen: true,
    items: [],
    menuOffsetTop: 0,
    onMenuMounted: noop,
    onMenuReposition: noop,
    onMenuUnmounted: noop,
    positionFixed: false,
    shouldDropDirectionUpdate: noop,
    selectItem: noop,
    zIndex: 1080,
  }

  id: string = uniqueID()
  didOpen: boolean = false
  node: HTMLElement
  parentNode: HTMLElement
  placementNode: HTMLElement
  wrapperNode: HTMLElement
  memoSetPositionStylesOnNode: any
  positionRAF: any = null

  componentDidMount() {
    this.memoSetPositionStylesOnNode = memoizeWithProps(
      this.setPositionStylesOnNode
    )
    this.updateMenuNodePosition()
  }

  componentWillUnmount() {
    this.forceHideMenuNode()
  }

  /* istanbul ignore next */
  // Skipping coverage for this method as it does almost exclusively DOM
  // calculations, which isn't a JSDOM's forte.
  shouldDropUp(): boolean {
    // Always return true, if dropUp
    if (this.props.dropUp) return true

    if (!this.node || !this.wrapperNode) return false

    const { top } = this.wrapperNode.getBoundingClientRect()
    const { clientHeight: height } = this.node

    const hasWindowBottomOverflow = top + height > window.innerHeight
    const hasWindowTopOverflow = top - height < 0

    if (hasWindowBottomOverflow) {
      return !hasWindowTopOverflow
    }
    return false
  }

  shouldDropDirectionUpdate(positionProps): boolean {
    return (
      this.didOpen &&
      this.props.shouldDropDirectionUpdate({
        ...positionProps,
        dropUp: this.props.dropUp,
      })
    )
  }

  getMenuProps() {
    const { dropRight, isOpen, items, id, triggerId } = this.props

    const shouldDropUp = this.shouldDropUp()

    return {
      dropRight,
      getItemProps: this.getItemProps,
      renderItemsAsGroups: this.renderItemsAsGroups,
      renderItems: this.renderItems,
      hasGroups: this.hasGroups(),
      isOpen,
      items,
      id,
      triggerId,
      shouldDropUp,
    }
  }

  hasGroups() {
    return hasGroups(this.props.items)
  }

  getItemProps = (item: any, index?: number) => {
    const state = this.props.getState()
    const props = getItemProps(state, item, index)

    return props
  }

  renderItemsAsGroups = ({
    /* istanbul ignore next */
    id = 'group',
    items,
    withIndex,
  }) => {
    let groupStartIndex = 0

    return items.map((group, index) => {
      const { items, ...groupProps } = group
      const groupId = `${id}-group-${index}`
      const groupHeaderId = `${id}-group-${index}-header`

      if (!items.length) return

      const groupedItemsMarkup = (
        <Group key={groupId} id={groupId} aria-labelledby={groupHeaderId}>
          <Item {...groupProps} id={groupHeaderId} />
          {items.map((item, index) => {
            /* istanbul ignore next */
            const indexProp = withIndex ? index + groupStartIndex : undefined

            return (
              <Item {...this.getItemProps(item, indexProp)} id={groupHeaderId}>
                {item.label}
              </Item>
            )
          })}
        </Group>
      )

      // This ensures that the set(s) have the current path index.
      // This is especially important if the groups are filtered.
      groupStartIndex += items.length

      return groupedItemsMarkup
    })
  }

  renderItems = ({
    items,
    withIndex,
  }: {
    items: Array<any>
    withIndex?: boolean
  }) => {
    return items.map((item, index) => {
      /* istanbul ignore next */
      const indexProp = withIndex ? index : undefined
      return <Item {...this.getItemProps(item, indexProp)}>{item.label}</Item>
    })
  }

  renderMenuItems() {
    const { id, isLoading, renderEmpty, renderLoading } = this.props
    const { items } = this.getMenuProps()

    // Loading
    if (isLoading && renderLoading)
      return renderRenderPropComponent(renderLoading)
    // Empty
    if (!items.length && renderEmpty)
      return renderRenderPropComponent(renderEmpty)
    // Groups
    if (this.hasGroups())
      return this.renderItemsAsGroups({ items, id, withIndex: false })
    // Normal
    return this.renderItems({ items })
  }

  renderMenu() {
    const { id, triggerId } = this.getMenuProps()

    return (
      <Card>
        <Menu aria-labelledby={triggerId} id={id}>
          {this.renderMenuItems()}
        </Menu>
      </Card>
    )
  }

  renderContent() {
    const { children } = this.props

    if (children) {
      return children(this.getMenuProps())
    }

    return this.renderMenu()
  }

  getTargetNode = (): HTMLElement => {
    return this.props.triggerNode || this.wrapperNode
  }

  getStylePosition = (): any => {
    const targetNode = this.getTargetNode()

    const rect = targetNode.getBoundingClientRect()
    const { height, top, left } = rect

    return {
      left,
      top: top + height,
    }
  }

  forceHideMenuNode = () => {
    if (!this.placementNode) return
    this.placementNode.style.display = 'none'
  }

  updateMenuNodePosition = () => {
    this.memoSetPositionStylesOnNode(this.getPositionProps())
  }

  /* istanbul ignore next */
  repositionMenuNodeCycle = () => {
    this.updateMenuNodePosition()
    if (!this.didOpen) {
      this.didOpen = true
    }
    if (isBrowserEnv()) {
      requestAnimationFrame(this.repositionMenuNodeCycle)
    }
  }

  onPortalOpen = () => {
    this.props.onMenuMounted()
    // Start the reposition cycle
    this.positionRAF = requestAnimationFrame(this.repositionMenuNodeCycle)
  }

  onPortalClose = () => {
    this.props.onMenuUnmounted()
    this.didOpen = false
    // End the reposition cycle
    cancelAnimationFrame(this.positionRAF)
  }

  getPositionProps = () => {
    const { positionFixed } = this.props

    const defaultStyles = {
      position: positionFixed,
      top: 0,
      left: 0,
    }

    if (!this.node || !this.placementNode) return defaultStyles

    const { top, left } = this.getStylePosition()
    const position = positionFixed ? 'fixed' : 'absolute'

    return {
      left,
      position,
      top,
    }
  }

  setPositionStylesOnNode = positionData => {
    const { menuOffsetTop, onMenuReposition, triggerNode, zIndex } = this.props

    if (!this.node || !this.placementNode) return

    const { top, left, position } = positionData

    const positionProps = {
      top: Math.round(top),
      left: Math.round(left),
      position,
      triggerNode,
      placementNode: this.placementNode,
      menuNode: this.node,
      zIndex,
    }

    this.placementNode.style.position = position
    this.placementNode.style.top = `${Math.round(top)}px`
    this.placementNode.style.left = `${Math.round(left)}px`
    this.placementNode.style.zIndex = `${zIndex}`

    // Provide properties via stateReducer callback
    onMenuReposition(positionProps)

    /* istanbul ignore next */
    // Skipping coverage for this method as it does almost exclusively DOM
    // calculations, which isn't a JSDOM's forte.
    if (triggerNode) {
      this.placementNode.style.width = `${triggerNode.clientWidth}px`
    }

    /* istanbul ignore next */
    if (this.shouldDropUp() && this.shouldDropDirectionUpdate(positionProps)) {
      this.node.classList.add('is-dropUp')
      if (triggerNode) {
        this.placementNode.style.marginTop = `-${triggerNode.clientHeight +
          menuOffsetTop}px`
      }
    } else {
      this.node.classList.remove('is-dropUp')
      if (triggerNode) {
        this.placementNode.style.marginTop = `${menuOffsetTop}px`
      }
    }
  }

  setNodeRef = node => {
    /* istanbul ignore else */
    if (node) {
      this.node = node
      this.parentNode = node.parentElement
    }

    this.props.innerRef(node)
  }

  setWrapperNode = node => (this.wrapperNode = node)
  setPlacementNode = node => (this.placementNode = node)

  render() {
    const {
      animationDuration,
      animationSequence,
      className,
      dropRight,
      focusItem,
      isOpen,
      selectItem,
    } = this.props
    const shouldDropUp = this.shouldDropUp()

    const componentClassName = classNames(
      'c-DropdownV2MenuContainer',
      shouldDropUp && 'is-dropUp',
      !dropRight && 'is-dropLeft',
      className
    )

    return (
      <div className="DropdownV2MenuContainerRoot" ref={this.setWrapperNode}>
        {isOpen && (
          <Portal
            id={this.id}
            onOpen={this.onPortalOpen}
            onClose={this.onPortalClose}
          >
            <div
              className="DropdownV2MenuContainerPlacementRoot"
              style={{ position: 'relative' }}
              ref={this.setPlacementNode}
            >
              <Renderer />
              <Animate
                sequence={shouldDropUp ? 'fade up' : animationSequence}
                in={isOpen}
                mountOnEnter={false}
                unmountOnExit={false}
                duration={animationDuration}
                timeout={animationDuration / 2}
              >
                <MenuContainerUI
                  className={componentClassName}
                  innerRef={this.setNodeRef}
                  onClick={selectItem}
                  onMouseMove={focusItem}
                  {...{
                    [SELECTORS.menuRootAttribute]: true,
                  }}
                >
                  {this.renderContent()}
                </MenuContainerUI>
              </Animate>
            </div>
          </Portal>
        )}
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.MenuContainer)(MenuContainer)
const PropConnectedComponent = propConnect(COMPONENT_KEY.MenuContainer)(
  MenuContainer
)

const ConnectedMenuContainer: any = connect(
  // mapStateToProps
  (state: any) => {
    const {
      dropUp,
      getState,
      isLoading,
      isOpen,
      items,
      menuId,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      shouldDropDirectionUpdate,
      triggerId,
      triggerNode,
      zIndex,
    } = state

    return {
      dropRight: isDropRight(state),
      dropUp,
      getState,
      id: menuId,
      isLoading,
      isOpen,
      items,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      shouldDropDirectionUpdate,
      triggerId,
      triggerNode,
      zIndex,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    focusItem,
    onMenuMounted,
    onMenuReposition,
    onMenuUnmounted,
    selectItem,
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedMenuContainer
