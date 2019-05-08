import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { PopperUI } from './styles/Tooltip.css'
import { POPPER_COMPONENT_KEY } from './Tooltip.utils'

export interface Props {
  children: any
  className?: string
  innerRef: (node: HTMLElement) => void
  theme?: string
}

export class Popper extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
  }

  static className = 'c-TooltipPopper'

  getClassName() {
    const { className } = this.props

    return classNames(Popper.className, className)
  }

  render() {
    const { children, className, innerRef, theme, ...rest } = this.props

    return (
      <PopperUI
        {...getValidProps(rest)}
        innerRef={innerRef}
        className={this.getClassName()}
      >
        {children}
      </PopperUI>
    )
  }
}

const PropConnectedComponent = propConnect(POPPER_COMPONENT_KEY)(Popper)

export default PropConnectedComponent
