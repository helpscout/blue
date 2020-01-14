import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import { MenuWrapperUI, MenuUI } from './Dropdown.css.js'
import ScrollLock from '../../ScrollLock'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  className?: string
  children?: any
  id?: string
  menuRef: (node: HTMLElement) => void
  innerRef: (node: HTMLElement) => void
  isSubMenu: boolean
  renderMenu?: (props: any) => void
  style: Object
  withScrollLock: boolean
  wrapperStyles: Object
  zIndex: number
}

export class Menu extends React.PureComponent<Props> {
  static displayName = 'DropdownMenu'

  static defaultProps = {
    menuRef: noop,
    innerRef: noop,
    isSubMenu: false,
    role: 'listbox',
    style: {},
    withScrollLock: true,
    wrapperStyles: {},
    zIndex: 1015,
  }

  getStyles(): Object {
    const { style, zIndex } = this.props

    return { ...style, zIndex }
  }

  getWrapperStyles(): Object {
    const { wrapperStyles } = this.props

    return { ...wrapperStyles }
  }

  renderMenu() {
    const {
      children,
      className,
      menuRef,
      innerRef,
      isSubMenu,
      renderMenu,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownV2Menu',
      isSubMenu && 'is-subMenu',
      className
    )

    const menuProps = {
      ...getValidProps(rest),
      children,
      className: componentClassName,
      ref: renderMenu ? undefined : menuRef,
      style: this.getStyles(),
      'data-cy': 'DropdownMenu',
    }

    const menuMarkup = renderMenu ? (
      renderMenu(menuProps)
    ) : (
      <MenuUI {...menuProps} />
    )

    return (
      <MenuWrapperUI
        className="c-DropdownV2MenuWrapper"
        ref={innerRef}
        style={this.getWrapperStyles()}
      >
        {menuMarkup}
      </MenuWrapperUI>
    )
  }

  render() {
    const { withScrollLock } = this.props

    return withScrollLock ? (
      <ScrollLock stopPropagation>{this.renderMenu()}</ScrollLock>
    ) : (
      this.renderMenu()
    )
  }
}

const ConnectedMenu: any = connect(
  // mapStateToProps
  (state: any) => {
    const { renderMenu, withScrollLock } = state

    return {
      renderMenu,
      withScrollLock,
    }
  }
)(
  // @ts-ignore
  Menu
)

export default ConnectedMenu
