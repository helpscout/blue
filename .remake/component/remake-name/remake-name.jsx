import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { <%= name %>UI } from './styles/<%= name %>.css'

export class <%= name %> extends React.Component {
  static className = 'c-<%= name %>'
  static defaultProps = {
    innerRef: noop
  }

  getClassName() {
    const { className } = this.props
    return classNames(
      <%= name %>.className,
      className
    )
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <<%= name %>UI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        {children}
      </<%= name %>UI>
    )
  }
}

<%= name %>.propTypes = {
  className: PropTypes.string,
}

export default <%= name %>