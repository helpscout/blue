import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { OverlayUI } from './styles/Overlay.css'

type Props = {
  children?: any
  className?: string
  fixed: boolean
  transparent: boolean
}

class Overlay extends React.PureComponent<Props> {
  static defaultProps = {
    fixed: false,
    transparent: false,
  }

  render() {
    const { children, className, fixed, transparent, ...rest } = this.props

    const componentClassName = classNames(
      'c-Overlay',
      fixed && 'is-fixed',
      transparent && 'is-transparent',
      className
    )

    return (
      <OverlayUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="dialog"
      >
        {children}
      </OverlayUI>
    )
  }
}

export default Overlay
