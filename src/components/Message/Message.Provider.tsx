import * as React from 'react'
import ThemeProvider from '../ThemeProvider'

import { noop } from '../../utilities/other'

export type MessageProviderProps = {
  theme: any
  children: any
}

// TODO: fix typescript complains
// @ts-ignore
class Provider extends ThemeProvider<MessageProviderProps> {
  static defaultProps = {
    theme: 'admin',
  }
  static childContextTypes = {
    theme: noop,
  }
  static displayName = 'MessageProvider'

  render() {
    // TODO: fix typescript complains
    // @ts-ignore
    return <div className="c-MessageProvider">{this.props.children}</div>
  }
}

export default Provider
