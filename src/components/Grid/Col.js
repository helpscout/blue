import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { ColUI } from './styles/Col.css.js'

export type ColSize = 'md' | 'sm' | 'xs'
export interface Props {
  className?: string;
  children?: any;
  size?: ColSize;
}

class Col extends Component<Props> {
  render() {
    const { className, children, size, ...rest } = this.props

    const sizeClassName = size ? variantClassNames('is', size) : null
    const componentClassName = classNames('c-Col', sizeClassName, className)

    return (
      <ColUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ColUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Col, Col)

export default Col
