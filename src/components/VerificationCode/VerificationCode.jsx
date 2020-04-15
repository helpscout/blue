import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { copyToClipboard } from '../../utilities/clipboard'
import { noop } from '../../utilities/other'
import {
  selectAll,
  clearAll,
  getCleanSelectedText,
  getCurrentCodeValue,
  showInputDigits,
  CLASSNAMES,
} from './VerificationCode.utils'
import {
  VerificationCodeFieldUI,
  DigitInputWrapperUI,
  DigitMaskUI,
  DigitInputUI,
  ClipboardPlaceholderUI,
  IconUI,
  ValidIconUI,
} from './VerificationCode.css'
import Tooltip from '../Tooltip'

export default class VerificationCode extends React.Component {
  static propTypes = {
    autofocus: PropTypes.bool,
    code: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isValid: PropTypes.bool,
    numberOfChars: PropTypes.number,
    onEnter: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    autofocus: false,
    code: '',
    isValid: true,
    numberOfChars: 6,
    onEnter: noop,
    onChange: noop,
  }

  componentDidMount() {
    this.digitInputNodes = Array.from(
      this.verificationCodeFieldRef.querySelectorAll('.DigitInput')
    )
    this.digitMaskNodes = Array.from(
      this.verificationCodeFieldRef.querySelectorAll('.DigitMask')
    )

    const { code, autofocus } = this.props

    if (code) {
      code
        .slice(0, 6)
        .split('')
        .forEach((char, index, arr) => {
          if (this.digitInputNodes.length > 0) {
            this.digitInputNodes[index].value = char
            this.digitMaskNodes[index].innerText = char
          }
        })
    }

    if (autofocus && this.digitInputNodes[0]) {
      this.digitInputNodes[0].focus()
    }
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props

    if (prevProps.code !== code) {
      if (code) {
        clearAll(this.digitInputNodes, this.digitMaskNodes)

        code
          .slice(0, 6)
          .split('')
          .forEach((char, index, arr) => {
            if (this.digitInputNodes.length > 0) {
              this.digitInputNodes[index].value = char
              this.digitMaskNodes[index].innerText = char
            }
          })
      }
    }
  }

  getClassName() {
    const { className, isValid } = this.props

    return classNames('c-VerificationCode', !isValid && 'not-valid', className)
  }

  setVerificationCodeFieldNode = node => {
    this.verificationCodeFieldRef = node
  }

  setClipboardPlaceholderNode = node => {
    this.clipboardPlaceholderRef = node
  }

  handlePaste = e => {
    const { onChange } = this.props
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')

    e.stopPropagation()
    e.preventDefault()

    if (pastedData.length > 0) {
      pastedData
        .slice(0, 6)
        .split('')
        .forEach((char, index, arr) => {
          if (this.digitInputNodes.length > 0) {
            this.digitInputNodes[index].value = char
            this.digitMaskNodes[index].innerText = char

            if (index === arr.length - 1) {
              this.digitInputNodes[index].focus()
            }
          }
        })
      onChange(getCurrentCodeValue(this.digitInputNodes))
    }
  }

  handleKeyDown = e => {
    const { key, metaKey, ctrlKey } = e

    if ((metaKey || ctrlKey) && key === 'a') {
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    } else if ((metaKey || ctrlKey) && key === 'c') {
      const selectionText = getCleanSelectedText()

      this.clipboardPlaceholderRef.value = selectionText
      this.clipboardPlaceholderRef.select()
      copyToClipboard()
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    } else if (key === 'Enter') {
      const { onEnter } = this.props
      const code = this.digitInputNodes
        .map(input => input.value)
        .join('')
        .trim()

      onEnter(code)
    }
  }

  // Tested  ¯\_(ツ)_/¯

  handleMouseDown = e => {
    const activeElement = document.activeElement
    const { target } = e

    if (
      !target.classList.contains('DigitInput') &&
      !activeElement.classList.contains('DigitInput')
    ) {
      // First we check if the click a) Wasn't executed directly on the input and b) one of the inputs is already focused
      // If that is the case, we focus the first input
      // We use a timeout to take the execution of this action out of the event loop so that the browser doesn't focus the body
      setTimeout(() => {
        this.digitInputNodes[0].focus()
      }, 0)
    } else if (!target.classList.contains('DigitInput')) {
      // If the click happened anywhere inside but not an input, the browser tries to focus the body (or a parent), we bring the focus
      // back to the cached activeElement using a timeout as above
      setTimeout(() => {
        activeElement.focus()
      }, 0)
    }
  }

  handleInputKeyUp = (index, e) => {
    const { key } = e

    if (key !== 'Meta') {
      const { value } = e.target
      const { numberOfChars, onChange } = this.props
      const digitMask = this.digitMaskNodes[index]

      if (key === 'Backspace') {
        let selectionText = getCleanSelectedText()

        if (selectionText.length > 1) {
          clearAll(this.digitInputNodes, this.digitMaskNodes)
          showInputDigits(this.digitInputNodes, this.digitMaskNodes)
          this.digitInputNodes[0].focus()
          onChange('')
        } else if (value === '' && !digitMask.innerText) {
          // Tested  ¯\_(ツ)_/¯

          const prevIndex = index === 0 ? 0 : index - 1
          const previousDigit = this.digitInputNodes[prevIndex]

          digitMask.innerText = value
          previousDigit && previousDigit.select()
          onChange(getCurrentCodeValue(this.digitInputNodes))
        } else {
          digitMask.innerText = value
          onChange(getCurrentCodeValue(this.digitInputNodes))
        }
      } else if (key === 'ArrowLeft') {
        const prevIndex = index === 0 ? 0 : index - 1
        const previousDigit = this.digitInputNodes[prevIndex]

        previousDigit && previousDigit.select()
      } else if (key === 'ArrowRight') {
        const nextIndex =
          index === numberOfChars - 1 ? numberOfChars : index + 1
        const nextDigit = this.digitInputNodes[nextIndex]

        nextDigit && nextDigit.select()
      } else if (key.length === 1) {
        // all chars have a length of 1, special keys have more
        const nextIndex =
          index === numberOfChars - 1 ? numberOfChars : index + 1
        const nextDigit = this.digitInputNodes[nextIndex]

        digitMask.innerText = value
        nextDigit && nextDigit.select()

        onChange(getCurrentCodeValue(this.digitInputNodes))
      }
    }
  }

  handleInputClick = e => {
    showInputDigits(this.digitInputNodes, this.digitMaskNodes)
    e.target.select()
  }

  render() {
    const { numberOfChars, isValid } = this.props

    return (
      <VerificationCodeFieldUI
        className={this.getClassName()}
        ref={this.setVerificationCodeFieldNode}
        onPaste={this.handlePaste}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
      >
        <ClipboardPlaceholderUI
          readOnly={true}
          tabIndex="-1"
          ref={this.setClipboardPlaceholderNode}
        />
        {Array(numberOfChars)
          .fill(0)
          .map((_, index) => {
            return (
              <DigitInputWrapperUI
                className="DigitInputWrapper"
                key={`DigitInput-${index}`}
              >
                <DigitMaskUI className={`DigitMask ${CLASSNAMES.hidden}`} />
                <DigitInputUI
                  className="DigitInput"
                  maxLength="1"
                  onClick={this.handleInputClick}
                  onKeyUp={e => {
                    this.handleInputKeyUp(index, e)
                  }}
                />
              </DigitInputWrapperUI>
            )
          })}
        {!isValid ? (
          <ValidIconUI>
            <Tooltip
              animationDelay={0}
              animationDuration={0}
              display="block"
              placement="top-end"
              title="Invalid verification code"
            >
              <IconUI name="alert" size={24} />
            </Tooltip>
          </ValidIconUI>
        ) : null}
      </VerificationCodeFieldUI>
    )
  }
}
