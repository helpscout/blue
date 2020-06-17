import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FluffyCardContainerUI } from './FluffyCard.css'

class FluffyCardContainer extends React.PureComponent {
  render() {
    const { children, className, ...rest } = this.props
    const componentClassName = classNames('c-FluffyCardContainer', className)

    return (
      <FluffyCardContainerUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </FluffyCardContainerUI>
    )
  }
}

FluffyCardContainer.propTypes = {
  className: PropTypes.string,
}

FluffyCardContainer.defaultProps = {
  'data-cy': 'FluffyCardContainer',
}

export default FluffyCardContainer
