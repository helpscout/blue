import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  TextUI,
} from './CopyButton.css'

class CopyButton extends React.PureComponent {
  state = {
    shouldRenderConfirmation: false,
  }

  _isMounted = false
  confirmationTimeout = null

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this.clearConfirmationTimeout()
    this._isMounted = false
  }

  safeSetState = state => {
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

  handleOnClick = event => {
    this.clearConfirmationTimeout()
    this.startConfirmationTimeout()
    this.props.onClick(event)
  }

  render() {
    const { className, kind, size, ...rest } = this.props
    const { shouldRenderConfirmation } = this.state
    const componentClassName = classNames(
      'c-CopyButton',
      shouldRenderConfirmation && 'is-copyConfirmed',
      className
    )
    const iconSize = size === 'sm' ? '20' : '24'

    return (
      <CopyButtonUI
        {...getValidProps(rest)}
        kind={kind}
        onClick={this.handleOnClick}
        size={size}
        className={componentClassName}
      >
        <ConfirmationIconWrapperUI>
          <Icon
            className="c-CopyButton__iconConfirmation"
            name="checkmark"
            size={iconSize}
          />
        </ConfirmationIconWrapperUI>
        <TextUI>Copy</TextUI>
      </CopyButtonUI>
    )
  }
}

CopyButton.propTypes = {
  canRenderFocus: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  kind: PropTypes.string,
  onClick: PropTypes.func,
  onReset: PropTypes.func,
  resetTimeout: PropTypes.number,
  size: PropTypes.any,
  title: PropTypes.string,
}

CopyButton.defaultProps = {
  'data-cy': 'CopyButton',
  canRenderFocus: false,
  onClick: noop,
  onReset: noop,
  kind: 'secondary',
  resetTimeout: 2000,
}

export default CopyButton
