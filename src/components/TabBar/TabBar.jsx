import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Nav from '../Nav'
import Toolbar from '../Toolbar'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TabBarUI, SecContentUI, ToolbarUI } from './TabBar.css'

export class TabBar extends React.Component {
  static className = 'c-TabBar'
  static defaultProps = {
    innerRef: noop,
    align: 'left',
  }

  static Item = Nav.Item

  getClassName() {
    const { className } = this.props
    return classNames(TabBar.className, className)
  }

  render() {
    const { children, innerRef, secContent, align, ...rest } = this.props

    return (
      <TabBarUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        align={align}
      >
        <ToolbarUI placement="top">
          <Toolbar.Item>
            <Nav>{children}</Nav>
          </Toolbar.Item>
          {secContent && (
            <SecContentUI align={align}>{secContent}</SecContentUI>
          )}
        </ToolbarUI>
      </TabBarUI>
    )
  }
}

TabBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  innerRef: PropTypes.func,
  secContent: PropTypes.any,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default TabBar
