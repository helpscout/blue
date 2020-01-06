import * as React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  ContentWrapperUI,
} from './styles/CopyButton.css.js'
import { COMPONENT_KEY } from './CopyButton.utils'
import { ButtonSize } from '../Button/Button.types'

export interface Props {
  canRenderFocus: boolean
  children?: any
  className?: string
  icon: string
  kind: string
  onClick: (event: Event) => void
  onReset: () => void
  resetTimeout: number
  size: ButtonSize
  title?: string
}

export interface State {
  shouldRenderConfirmation: boolean
}

class CopyButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    canRenderFocus: false,
    icon: 'copy',
    iconShade: 'faint',
    onClick: noop,
    onReset: noop,
    kind: 'tertiary',
    resetTimeout: 1500,
  }

  state = {
    shouldRenderConfirmation: false,
  }

  _isMounted: boolean = false
  confirmationTimeout: any = null

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this.clearConfirmationTimeout()
    this._isMounted = false
  }

  safeSetState = (state: any) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state)
    }
  }

  startConfirmationTimeout = () => {
    const { onReset, resetTimeout } = this.props

    this.safeSetState({
      shouldRenderConfirmation: true,
    })

    this.confirmationTimeout = setTimeout(() => {
      this.safeSetState({
        shouldRenderConfirmation: false,
      })
      onReset()
    }, resetTimeout)
  }

  clearConfirmationTimeout = () => {
    clearTimeout(this.confirmationTimeout)
  }

  handleOnClick = (event: Event) => {
    this.clearConfirmationTimeout()
    this.startConfirmationTimeout()
    this.props.onClick(event)
  }

  isIconOnly = () => {
    return !this.props.children
  }

  getContentMarkup = () => {
    const { children, icon } = this.props

    return this.isIconOnly() ? (
      <Icon className="c-CopyButton__iconCopy" name={icon} />
    ) : (
      children
    )
  }

  render() {
    const { className, icon, kind, ...rest } = this.props
    const { shouldRenderConfirmation } = this.state
    const isIconOnly = this.isIconOnly()

    const componentClassName = classNames(
      'c-CopyButton',
      isIconOnly && 'is-iconOnly',
      shouldRenderConfirmation && 'is-copyConfirmed',
      className
    )

    const wrapperClassName = classNames(
      'c-CopyButton__contentWrapper',
      shouldRenderConfirmation && 'is-copyConfirmed',
      isIconOnly && 'is-animatable'
    )

    return (
      <CopyButtonUI
        {...rest}
        className={componentClassName}
        kind={kind}
        onClick={this.handleOnClick}
      >
        <ConfirmationIconWrapperUI className={wrapperClassName}>
          <Icon className="c-CopyButton__iconConfirmation" name="tick-small" />
        </ConfirmationIconWrapperUI>
        <ContentWrapperUI className={wrapperClassName}>
          {this.getContentMarkup()}
        </ContentWrapperUI>
      </CopyButtonUI>
    )
  }
}

export default CopyButton
