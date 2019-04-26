import * as React from 'react'
import { connect } from '@helpscout/wedux'
import propConnect from '../../PropProvider/propConnect'
import Animate from '../../Animate'
import Card from './Dropdown.Card'
import Menu from './Dropdown.Menu'
import MenuPortal from './Dropdown.MenuPortal'
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
  clearSelection,
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
import { getComputedClientRect } from './Dropdown.MenuContainer.utils'

const uniqueID = createUniqueIDFactory('DropdownMenuContainer')
const clearerID = createUniqueIDFactory('hsds-dropdown-v2-theallclearer')

export interface Props {
  allowMultipleSelection?: boolean
  animationDuration: number
  animationSequence: string
  children?: (props: any) => void
  className?: string
  clearSelection: (...args: any[]) => void
  closeDropdown: () => void
  dropRight: boolean
  dropUp: boolean
  forceDropDown: boolean
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
  selectionClearer?: string
  shouldDropDirectionUpdate: (Position: any) => boolean
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export const defaultProps = {
  animationDuration: 80,
  animationSequence: 'fade down',
  closeDropdown: noop,
  dropRight: true,
  dropUp: false,
  forceDropDown: false,
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
  shouldDropDirectionUpdate: () => true,
  selectItem: noop,
  clearSelection: noop,
  zIndex: 1080,
}

export class MenuContainer extends React.PureComponent<Props> {
  static defaultProps = defaultProps

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
    if (!this.didOpen) return true

    return this.props.shouldDropDirectionUpdate({
      ...positionProps,
      dropUp: this.props.dropUp,
    })
  }

  getMenuProps() {
    const {
      dropRight,
      isOpen,
      items,
      id,
      triggerId,
      allowMultipleSelection,
    } = this.props

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
    const {
      allowMultipleSelection,
      clearSelection,
      focusItem,
      selectionClearer,
    } = this.props

    if (allowMultipleSelection && selectionClearer) {
      const clearerItem = {
        value: selectionClearer,
        id: clearerID(),
        label: '',
      }

      return [clearerItem].concat(items).map((item, index) => {
        /* istanbul ignore next */
        const indexProp = withIndex ? index : undefined
        const itemProps: any = this.getItemProps(item, indexProp)

        if (item.id === clearerItem.id) {
          return (
            <div key={clearerItem.id}>
              <Item
                {...itemProps}
                onMouseMove={focusItem}
                onClick={clearSelection}
                isSelectionClearer
              />
              <Item type="divider" />
            </div>
          )
        }

        return <Item {...itemProps}>{item.label}</Item>
      })
    }

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

    const rect = getComputedClientRect(targetNode)
    const { top, left } = rect

    return {
      left,
      top,
    }
  }

  forceHideMenuNode = () => {
    /* istanbul ignore next */
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
    this.props.closeDropdown()
    this.focusTriggerNode()
  }

  focusTriggerNode = () => {
    const { triggerNode } = this.props
    if (!triggerNode) return

    triggerNode.focus()
  }

  getPositionProps = () => {
    const { positionFixed } = this.props

    const defaultStyles = {
      position: positionFixed,
      top: 0,
      left: 0,
    }

    /* istanbul ignore next */
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

    /* istanbul ignore next */
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
      didOpen: this.didOpen,
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
    if (this.props.forceDropDown) return
    if (!this.shouldDropDirectionUpdate(positionProps)) return

    if (this.shouldDropUp()) {
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
      !dropRight && 'is-dropLeft',
      className
    )

    return (
      <div className="DropdownV2MenuContainerRoot" ref={this.setWrapperNode}>
        <MenuPortal
          id={this.id}
          isOpen={isOpen}
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
        </MenuPortal>
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
      allowMultipleSelection,
      dropUp,
      forceDropDown,
      getState,
      isLoading,
      isOpen,
      items,
      menuId,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      selectedItem,
      selectionClearer,
      shouldDropDirectionUpdate,
      triggerId,
      triggerNode,
      zIndex,
    } = state

    return {
      allowMultipleSelection,
      dropRight: isDropRight(state),
      dropUp,
      forceDropDown,
      getState,
      id: menuId,
      isLoading,
      isOpen,
      items,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      selectedItem,
      selectionClearer,
      shouldDropDirectionUpdate,
      triggerId,
      triggerNode,
      zIndex,
    }
  },
  // mapDispatchToProps
  {
    clearSelection,
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
