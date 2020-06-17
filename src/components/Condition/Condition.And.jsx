import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { AndWrapperUI } from './Condition.css'

export const And = props => {
  const { className, 'data-cy': dataCy, ...rest } = props
  const componentClassName = classNames(And.className, className)

  return (
    <AndWrapperUI
      {...getValidProps(rest)}
      className={componentClassName}
      data-cy="ConditionAndWrapper"
    >
      <Operator data-cy={dataCy} type="and" isBorderless={false} />
    </AndWrapperUI>
  )
}

And.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

And.defaultProps = {
  'data-cy': 'ConditionAnd',
}
And.className = 'c-ConditionAnd'

export default And
