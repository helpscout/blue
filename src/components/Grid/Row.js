import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { RowUI } from './styles/Row.css.js'

export type RowSize = 'md' | 'sm' | 'xs'
export interface Props {
  className?: string;
  children?: any;
  flex: boolean; // deprecating
  isFlex: boolean;
  size?: RowSize;
}

class Row extends Component<Props> {
  static defaultProps = {
    flex: false,
    isFlex: false,
  }

  render() {
    const { className, children, flex, isFlex, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-Row',
      (flex || isFlex) && 'is-flex',
      size && `is-${size}`,
      className
    )

    return (
      <RowUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </RowUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Row, Row)

export default Row
