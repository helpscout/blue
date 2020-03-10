import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { AddOnUI } from './Input.AddOn.css'

const AddOn = props => {
  const { className, children, isFirst, isNotOnly, isLast, ...rest } = props

  const componentClassName = classNames(
    'c-InputAddOn',
    isFirst && 'is-first',
    isNotOnly && 'is-notOnly',
    isLast && 'is-last',
    className
  )

  return (
    <AddOnUI className={componentClassName} {...rest}>
      {children}
    </AddOnUI>
  )
}

AddOn.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Helps render component without right borders. */
  isFirst: PropTypes.bool,
  /** Helps render component without left/right borders. */
  isNotOnly: PropTypes.bool,
  /** Helps render component without left borders. */
  isLast: PropTypes.bool,
}

AddOn.defaultProps = {
  isFirst: false,
  isNotOnly: false,
  isLast: false,
}

AddOn.displayName = 'InputAddOn'

export default AddOn
