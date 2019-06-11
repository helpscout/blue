import * as React from 'react'
import { classNames } from '../../utilities/classNames'

export interface Props {
  className?: string
  name: string
  symbol: string
}

class EmojiView extends React.PureComponent<Props> {
  static className = 'c-EmojiPickerView'

  static defaultProps = {
    className: '',
    name: 'Unicorn Face',
    symbol: '🦄',
  }

  getClassName() {
    const { className } = this.props

    return classNames(EmojiView.className, className)
  }

  render() {
    const { name, symbol, ...rest } = this.props

    return (
      <span
        {...rest}
        role="img"
        aria-label={name}
        className={this.getClassName()}
      >
        {symbol}
      </span>
    )
  }
}

export default EmojiView
