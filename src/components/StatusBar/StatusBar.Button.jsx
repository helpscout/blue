import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

import { StatusBarButtonUI } from './StatusBar.css'

const StatusBarButton = props => {
  const { children, className, icon, ...rest } = props

  const componentClassName = classNames('c-StatusBarButton', className)

  const iconMarkup = icon ? (
    <Icon className="c-StatusBarButton__icon" inline name={icon} size="12" />
  ) : null

  return (
    <StatusBarButtonUI className={componentClassName} {...rest}>
      {children}
      {iconMarkup}
    </StatusBarButtonUI>
  )
}

StatusBarButton.displayName = 'StatusBarButton'
StatusBarButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any,
}

export default StatusBarButton
