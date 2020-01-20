import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import BadgeUI from './Badge.css'
import { UIStatus } from '../../constants/types'

type BadgeDisplay = 'block' | 'inlineBlock'

interface Props {
  children?: any
  className?: string
  color?: string
  count?: boolean
  display: BadgeDisplay
  inverted: boolean
  isSquare?: boolean
  size?: string
  status?: UIStatus
  style?: object
  textColor?: string
  white?: boolean
}

class Badge extends React.Component<Props> {
  static defaultProps = {
    display: 'inlineBlock',
    inverted: false,
    color: '',
    textColor: '',
  }

  static displayName = 'Badge'

  render() {
    const {
      children,
      color,
      count,
      className,
      display,
      inverted,
      isSquare,
      size,
      status,
      textColor,
      white,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Badge',
      count && 'is-count',
      display && `is-display-${display}`,
      isSquare && `is-square`,
      size && `is-${size}`,
      status && `is-${status}`,
      white && 'is-white',
      className
    )

    return (
      <BadgeUI
        {...{ ...getValidProps(rest), color, inverted, textColor }}
        className={componentClassName}
      >
        {children}
      </BadgeUI>
    )
  }
}

export default Badge
