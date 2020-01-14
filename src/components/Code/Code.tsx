import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { CodeUI } from './styles/Code.css'

export interface Props {
  className?: string
  children?: any
}

class Code extends React.PureComponent<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-Code', className)

    return (
      <CodeUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </CodeUI>
    )
  }
}

export default Code
