import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import GridComponent from '../Grid'
import { classNames } from '../../utilities/classNames'

class Grid extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  static displayName = 'FormGroupGrid'

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-FormGroupGrid', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        <GridComponent>{children}</GridComponent>
      </div>
    )
  }
}

export default Grid
