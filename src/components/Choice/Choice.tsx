import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Input from './Choice.Input'
import Flexy from '../Flexy'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'
import ChoiceGroupContext from '../ChoiceGroup/ChoiceGroup.Context'
import { includes } from '../../utilities/arrays'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import {
  ChoiceUI,
  ChoiceLabelUI,
  ChoiceLabelTextUI,
  ChoiceHelpTextUI,
} from './styles/Choice.css'
import { COMPONENT_KEY } from './Choice.utils'
import { ChoiceValue, ChoiceProps, ChoiceState } from './Choice.types'

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends React.PureComponent<ChoiceProps, ChoiceState> {
  static defaultProps = {
    autoFocus: false,
    checked: false,
    componentID: 'Choice',
    disabled: false,
    hideLabel: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    inputRef: noop,
    innerRef: noop,
    isBlock: false,
    readOnly: false,
    type: 'checkbox',
    value: '',
  }

  state = {
    checked: this.props.checked,
    id: this.props.id || uniqueID(this.props.componentID),
  }

  componentWillReceiveProps(nextProps: ChoiceProps) {
    this.setState({
      checked: nextProps.checked,
      id: nextProps.id || this.state.id,
    })
  }

  handleOnChange = (value: ChoiceValue, checked: boolean) => {
    this.setState({ checked })
    // TODO: fix typescript complains
    // @ts-ignore
    this.props.onChange(value, checked)
  }

  handleOnBlur = (event: Event) => {
    this.props.onBlur(event)
  }

  handleOnFocus = (event: Event) => {
    this.props.onFocus(event)
  }

  handleOnBlurWithContext = (contextProps: Object) => {
    return (...args) => {
      this.handleOnBlur.apply(null, args)
      // TODO: fix typescript complains
      // @ts-ignore
      if (contextProps.onBlur) {
        // TODO: fix typescript complains
        // @ts-ignore
        contextProps.onBlur.apply(null, args)
      }
    }
  }

  handleOnChangeWithContext = (contextProps: Object) => {
    return (...args) => {
      // TODO: fix typescript complains
      // @ts-ignore
      if (contextProps.onChange) {
        // TODO: fix typescript complains
        // @ts-ignore
        contextProps.onChange.apply(null, args)
        this.props.onChange.apply(null, args)
      } else {
        this.handleOnChange.apply(null, args)
      }
    }
  }

  handleOnFocusWithContext = (contextProps: Object) => {
    return (...args) => {
      this.handleOnFocus.apply(null, args)
      // TODO: fix typescript complains
      // @ts-ignore
      if (contextProps.onFocus) {
        // TODO: fix typescript complains
        // @ts-ignore
        contextProps.onFocus.apply(null, args)
      }
    }
  }

  getLabelMarkup = () => {
    const { children, disabled, hideLabel, label, stacked } = this.props

    if (!children && !label) {
      return null
    }

    const className = classNames(
      'c-Choice__label-text',
      stacked && 'is-stacked'
    )

    let labelTextMarkup = children
    if (!children) {
      labelTextMarkup = hideLabel ? (
        <VisuallyHidden>{label}</VisuallyHidden>
      ) : (
        <Text muted={disabled}>{label}</Text>
      )
    }

    const labelMarkup = (
      <ChoiceLabelTextUI className={className}>
        {labelTextMarkup}
      </ChoiceLabelTextUI>
    )

    if (stacked) {
      return labelMarkup
    }

    return <Flexy.Block>{labelMarkup}</Flexy.Block>
  }

  getHelpTextMarkup = () => {
    const { helpText, stacked, state } = this.props

    const className = classNames('c-Choice__help-text', stacked && 'is-stacked')

    return (
      helpText && (
        <ChoiceHelpTextUI className={className}>
          <HelpText state={state} muted>
            {helpText}
          </HelpText>
        </ChoiceHelpTextUI>
      )
    )
  }

  getInputMarkup = (contextProps: Object) => {
    const {
      align,
      autoFocus,
      disabled,
      helpText,
      inputRef,
      innerRef,
      kind,
      name,
      readOnly,
      stacked,
      state,
      type,
      value,
      ...rest
    } = this.props

    const { checked, id: choiceID } = this.state

    const isChecked =
      // TODO: fix typescript complains
      // @ts-ignore
      (contextProps.selectedValue &&
        // TODO: fix typescript complains
        // @ts-ignore
        includes(contextProps.selectedValue, value)) ||
      checked ||
      false

    const inputProps = {
      ...getValidProps(rest),
      align,
      autoFocus,
      checked: isChecked,
      disabled,
      helpText,
      id: choiceID,
      inputRef,
      innerRef,
      kind,
      // TODO: fix typescript complains
      // @ts-ignore
      name: contextProps.name || name,
      onBlur: this.handleOnBlurWithContext(contextProps),
      onFocus: this.handleOnFocusWithContext(contextProps),
      onChange: this.handleOnChangeWithContext(contextProps),
      readOnly,
      state,
      type,
      value,
    }

    const labelMarkup = this.getLabelMarkup()

    const inputMarkup = (
      <span className="c-Choice__control">
        <Input {...inputProps} />
      </span>
    )

    const inputLabelMarkup = stacked ? (
      <div className="c-Choice__stackedWrapper">
        {inputMarkup}
        {labelMarkup}
      </div>
    ) : (
      <Flexy just="left" gap="sm" align={align}>
        <Flexy.Item>{inputMarkup}</Flexy.Item>
        {labelMarkup}
      </Flexy>
    )

    return inputLabelMarkup
  }

  render() {
    const {
      align,
      autoFocus,
      children,
      className,
      componentID,
      disabled,
      helpText,
      hideLabel,
      id,
      inputRef,
      innerRef,
      isBlock,
      onBlur,
      onChange,
      onFocus,
      kind,
      label,
      name,
      readOnly,
      stacked,
      state,
      type,
      value,
      ...rest
    } = this.props
    const { checked, id: choiceID } = this.state

    const componentClassName = classNames(
      'c-Choice',
      `is-${type}`,
      checked && 'is-selected',
      disabled && 'is-disabled',
      isBlock && 'is-block',
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      stacked && 'is-stacked',
      state && `is-${state}`,
      className
    )

    const labelClassName = classNames(
      'c-Choice__label',
      checked && 'is-selected',
      disabled && 'is-disabled',
      isBlock && 'is-block',
      stacked && 'is-stacked'
    )

    return (
      <ChoiceGroupContext.Consumer>
        {(contextProps: Object) => (
          <ChoiceUI {...getValidProps(rest)} className={componentClassName}>
            <ChoiceLabelUI htmlFor={choiceID} className={labelClassName}>
              {this.getInputMarkup(contextProps)}
              {stacked ? this.getHelpTextMarkup() : null}
            </ChoiceLabelUI>
            {!stacked ? this.getHelpTextMarkup() : null}
          </ChoiceUI>
        )}
      </ChoiceGroupContext.Consumer>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Choice)

export default Choice
