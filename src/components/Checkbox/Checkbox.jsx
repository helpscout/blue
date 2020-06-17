import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

class Checkbox extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-Checkbox')

    return (
      <Choice
        {...getValidProps(rest)}
        className={componentClassName}
        componentID="Checkbox"
        type="checkbox"
      />
    )
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

Checkbox.defaultProps = {
  'data-cy': 'Checkbox',
}

export default Checkbox
