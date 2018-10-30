import React from 'react'
import { mount } from 'enzyme'
import Input from '../Input'
import Resizer from '../Resizer'

jest.useFakeTimers()

const ui = {
  field: '.c-InputField',
  errorIcon: '.c-Input__errorIcon',
  helpText: '.c-Input__helpText',
  hintText: '.c-Input__hintText',
  input: '.c-Input',
  label: '.c-Input__label',
  suffix: '.c-Input__inlineSuffix',
  tooltip: '.c-Tooltip',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find(ui.input)
    const field = wrapper.find(ui.field)
    const backdrop = wrapper.find('.c-Input__backdrop')

    expect(input.exists()).toBeTruthy()
    expect(field.exists()).toBeTruthy()
    expect(backdrop.exists()).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Input className={className} />)
    const o = wrapper.find(`.${className}`)

    expect(o.exists()).toBeTruthy()
  })
})

describe('Input', () => {
  test('Can generate an input component', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.instance().getInputMarkup()

    expect(o.type).toBe('input')
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    const wrapper = mount(<Input />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeFalsy()
  })

  test('Autofocuses if specified', () => {
    const wrapper = mount(<Input autoFocus />)
    const input = wrapper.find('input')

    expect(input.prop('autoFocus')).toBeTruthy()
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onClick={spy} />)
    const input = wrapper.find('input')

    input.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onChange callback passes selected value', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onChange={spy} />)
    const input = wrapper.find('input')
    const value = 'Champ Kind'

    input.node.value = value
    input.simulate('change')

    expect(spy).toHaveBeenCalledWith(value)
  })

  test('onWheel callback does not trigger for non-multiline inputs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onWheel={spy} multiline={false} />)
    const input = wrapper.find('input')

    input.simulate('wheel')

    expect(spy).not.toHaveBeenCalled()
  })

  test('onWheel callback only triggers for multiline + scrollLock enabled inputs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input onWheel={spy} multiline={true} scrollLock />)
    const input = wrapper.find('textarea')

    input.simulate('wheel')

    expect(spy).toHaveBeenCalled()
  })

  test('onWheel callback stops event from bubbling', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} scrollLock />)
    const input = wrapper.find('textarea')

    input.simulate('wheel', {
      stopPropagation: spy,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('onKeydown callback fires when input keyDown occurs', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} onKeyDown={spy} />)

    wrapper.instance().computedStyles = {
      paddingBottom: 10,
    }

    const input = wrapper.find('textarea')

    input.simulate('keydown')
    expect(spy).toHaveBeenCalled()
  })

  test('onKeydown callback fires scrollToBottom', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} onKeyDown={spy} />)
    const input = wrapper.find('textarea')
    wrapper.instance().scrollToBottom = spy

    input.simulate('keydown')
    expect(spy).toHaveBeenCalled()
  })

  test('onResize callback is called when Input resizes', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={true} onResize={spy} />)
    const resizer = wrapper.find('Resizer')

    resizer.getNode().handleOnResize()

    expect(spy).toHaveBeenCalled()
  })
})

describe('value', () => {
  test('Does not update the state if new value is the same as previous value', () => {
    const lifecycleSpy = jest.spyOn(
      Input.prototype,
      'componentWillReceiveProps'
    )
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value="initial value" />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({ value: 'initial value' })
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).not.toHaveBeenCalled()
    expect(wrapper.find('input').prop('value')).toBe('initial value')
  })

  test('Does update the state if new value is different than previous value', () => {
    const lifecycleSpy = jest.spyOn(
      Input.prototype,
      'componentWillReceiveProps'
    )
    const stateSpy = jest.spyOn(Input.prototype, 'setState')

    const wrapper = mount(<Input value="initial value" />)
    expect(wrapper.find('input').prop('value')).toBe('initial value')

    wrapper.setProps({ value: 'new value' })
    expect(lifecycleSpy).toHaveBeenCalled()
    expect(stateSpy).toHaveBeenCalledWith({ value: 'new value' })
    expect(wrapper.find('input').prop('value')).toBe('new value')
  })
})

describe('ID', () => {
  test('Automatically generates an ID if not defined', () => {
    const wrapper = mount(<Input label="Input" />)
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const id = input.prop('id')

    expect(id).toBeTruthy()
    expect(id).toContain('Input')
    expect(label.prop('htmlFor')).toBe(id)
  })

  test('Can set custom ID on Input', () => {
    const wrapper = mount(
      <Input label="Input" id="sixty-percent-of-the-time" />
    )
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    const id = input.prop('id')

    expect(id).toBeTruthy()
    expect(id).toContain('sixty-percent-of-the-time')
    expect(label.prop('htmlFor')).toBe(id)
  })
})

describe('Multiline', () => {
  test('Default selector is an input', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.field).getNode()

    expect(o.tagName.toLowerCase()).toBe('input')
    expect(o.type).toBe('text')
  })

  test('Selector becomes a textarea if multiline is defined', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.find(ui.field).getNode()

    expect(o.type).toBe('textarea')
  })

  test('Accepts number argument', () => {
    const wrapper = mount(<Input multiline={5} />)
    const o = wrapper.find(ui.field).getNode()

    expect(o.type).toBe('textarea')
  })

  test('Adds Resizer component if multiline is defined', () => {
    const wrapper = mount(<Input multiline />)

    expect(wrapper.find(Resizer).exists()).toBeTruthy()
  })

  test('Applies resizable styles if specified', () => {
    const wrapper = mount(<Input multiline resizable />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-resizable')
  })

  test('Has regular height without multiline', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.field)

    expect(o.prop('style')).toBe(null)
  })

  test('Sets height on textarea with multiline', () => {
    const wrapper = mount(<Input multiline={3} />)
    // This is very difficult (basically impossible) to test with Enzyme/JSDOM.
    // This method involves height calculation, which is absent from JSDOM's api.
    // JSDOM always returns 0 for height.

    // The only thing we can check is if the height is not null (because null is default)
    // The height should be 0, which is what JSDOM returns.

    expect(wrapper.state()).not.toBe(null)
  })

  test('Does not set maxHeight on multiline by default', () => {
    const wrapper = mount(<Input multiline={3} />)
    const o = wrapper.find(ui.field)

    expect(o.prop('style').maxHeight).toBeFalsy()
  })

  test('Sets maxHeight on multiline, if specified', () => {
    const wrapper = mount(<Input multiline={3} maxHeight={50} />)
    const o = wrapper.find(ui.field)

    expect(o.prop('style').maxHeight).toBe(50)
  })

  test('Adds maxHeight styles, if specified', () => {
    const wrapper = mount(<Input multiline={3} maxHeight={50} />)
    const o = wrapper.find(ui.input)

    expect(o.hasClass('has-maxHeight')).toBeTruthy()
  })

  test('maxHeight Accepts string values', () => {
    const wrapper = mount(<Input multiline={3} maxHeight="50vh" />)
    const o = wrapper.find(ui.field)

    expect(o.prop('style').maxHeight).toBe('50vh')
  })

  test('Does not focus input on resize', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input multiline={3} maxHeight="50vh" />)
    const o = wrapper.find(ui.field)
    o.getNode().onfocus = spy

    wrapper.instance().handleExpandingResize()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('HelpText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.helpText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds helpText if specified', () => {
    const wrapper = mount(<Input helpText="Help text" />)
    const o = wrapper.find(ui.helpText)
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Help text')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input helpText={custom} />)
    const o = wrapper.find(ui.helpText)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('HintText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(ui.hintText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds hintText if specified', () => {
    const wrapper = mount(<Input hintText="Hint text" />)
    const o = wrapper.find(ui.hintText)
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Hint text')
  })

  test('Does not pass state to hintText', () => {
    const wrapper = mount(<Input hintText="Hint text" state="error" />)
    const o = wrapper.find(ui.hintText)
    expect(o.props().state).not.toBeTruthy()
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input hintText={custom} />)
    const o = wrapper.find(ui.hintText)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('Label', () => {
  test('Adds label if specified', () => {
    const wrapper = mount(<Input label="Channel" />)
    const label = wrapper.find(ui.label)

    expect(label.exists()).toBeTruthy()
    expect(label.text()).toBe('Channel')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Input label={custom} />)
    const o = wrapper.find(ui.label)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('Styles', () => {
  test('Applies seamless styles if specified', () => {
    const wrapper = mount(<Input seamless />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-seamless')
  })

  test('Applies sizing styles if specified', () => {
    const wrapper = mount(<Input size="sm" />)
    const o = wrapper.find(ui.field)

    expect(o.prop('className')).toContain('is-sm')
  })

  test('Passes style prop to wrapper', () => {
    const wrapper = mount(<Input size="sm" style={{ background: 'red' }} />)

    expect(wrapper.prop('style').background).toBe('red')
  })
})

describe('States', () => {
  test('Applies disabled styles if specified', () => {
    const wrapper = mount(<Input disabled />)
    const o = wrapper.find(ui.input)
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-disabled')
    expect(input.prop('disabled')).toBeTruthy()
  })

  test('Applies readOnly styles if specified', () => {
    const wrapper = mount(<Input readOnly />)
    const o = wrapper.find(ui.input)
    const input = wrapper.find('input')

    expect(o.prop('className')).toContain('is-readonly')
    expect(input.prop('readOnly')).toBeTruthy()
  })

  test('Applies error styles if specified', () => {
    const wrapper = mount(<Input state="error" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<Input state="success" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<Input state="warning" />)
    const o = wrapper.find(ui.input)

    expect(o.prop('className')).toContain('is-warning')
  })

  test('Updates state.state on prop change', () => {
    const wrapper = mount(<Input state="warning" />)
    const input = wrapper.find(ui.input)

    wrapper.setProps({ state: 'success' })

    expect(wrapper.state().state).toBe('success')
    expect(input.hasClass('is-success')).toBe(true)

    wrapper.setProps({ state: null })

    expect(wrapper.state().state).toBe(null)
    expect(input.hasClass('is-success')).toBe(false)
  })
})

describe('Stateful helper label', () => {
  test('Renders stateful helper label if error is a string', () => {
    const wrapper = mount(<Input state="error" helpText="Error" />)
    const helperLabel = wrapper.find('.c-HelpText')

    expect(helperLabel.exists()).toBeTruthy()
    expect(helperLabel.text()).toBe('Error')
  })
})

describe('removeStateStylesOnFocus', () => {
  test('Does not remove state style on focus, by default', () => {
    const wrapper = mount(<Input state="error" />)
    const input = wrapper.find(ui.input)
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBe('error')
    expect(input.hasClass('is-error')).toBe(true)
  })

  test('Removes state style on focus, by specified', () => {
    const wrapper = mount(<Input state="error" removeStateStylesOnFocus />)
    const input = wrapper.find(ui.input)
    const o = wrapper.find('input')

    o.simulate('focus')

    expect(wrapper.state().state).toBeFalsy()
    expect(input.hasClass('is-error')).toBe(false)
  })
})

describe('inputNode', () => {
  test('Sets inputNode on mount', () => {
    const wrapper = mount(<Input />)

    expect(wrapper.getNode().inputNode).toBeTruthy()
  })

  test('Unsets inputNode on unmount', () => {
    const wrapper = mount(<Input />)
    wrapper.unmount()

    expect(wrapper.getNode().inputNode).not.toBeTruthy()
  })
})

describe('isFocused', () => {
  test('Can focus input using isFocused prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input isFocused />)
    const o = wrapper.getNode().inputNode
    o.onfocus = spy

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Can focus input using custom timeout', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input isFocused forceAutoFocusTimeout={20} />)
    const o = wrapper.getNode().inputNode
    o.onfocus = spy

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Can toggle isFocused', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Input onFocus={spy} isFocused={false} forceAutoFocusTimeout={20} />
    )
    const o = wrapper.getNode().inputNode
    o.onfocus = spy

    wrapper.setProps({ isFocused: true })

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('moveCursorToEnd', () => {
  test('Moves the selection cursor to end of value', () => {
    const wrapper = mount(<Input value="WEE" moveCursorToEnd />)
    wrapper.setState({ value: 'WEE' })
    wrapper.getNode().moveCursorToEnd()
  })
})

describe('Typing events', () => {
  let refs, spies, wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    refs = {
      applySubmit: () => {},
    }

    spies = {
      callStartTyping: jest.spyOn(Input.prototype, 'callStartTyping'),
      callStopTyping: jest.spyOn(Input.prototype, 'callStopTyping'),
      clearThrottler: jest.spyOn(Input.prototype, 'clearThrottler'),
      clearTypingTimeout: jest.spyOn(Input.prototype, 'clearTypingTimeout'),
      onStartTyping: jest.fn(),
      onStopTyping: jest.fn(),
      setThrottler: jest.spyOn(Input.prototype, 'setThrottler'),
      setTypingTimeout: jest.spyOn(Input.prototype, 'setTypingTimeout'),
      typingEvent: jest.spyOn(Input.prototype, 'typingEvent'),
    }

    wrapper = mount(
      <Input
        onStartTyping={spies.onStartTyping}
        onStopTyping={spies.onStopTyping}
        refApplyCallStopTyping={fn => (refs.applySubmit = fn)}
        typingTimeoutDelay={3000}
        withTypingEvent={true}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test(`On start typing should call start typing events and make a timeout`, () => {
    wrapper.find('input').simulate('change')
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(1)
    expect(spies.typingEvent).toHaveBeenCalledTimes(1)
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setTypingTimeout).toHaveBeenCalledTimes(1)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledTimes(1)
  })

  test('After a delay of 3000ms and no more typing events, should call stop typing events and clear timeout', () => {
    expect(wrapper.props().typingTimeoutDelay).toBe(3000)
    wrapper.find('input').simulate('change')
    expect(wrapper.state().typingTimeout).toBeDefined()
    expect(wrapper.state().typingThrottle).toBeDefined()
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    jest.runTimersToTime(5000)
    expect(wrapper.state.typingTimeout).not.toBeDefined()
    expect(spies.callStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(3)
    expect(clearTimeout).toHaveBeenCalledTimes(2)
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })

  test('If the delay is less than 3000ms reset the timeout than fire it if time advances past 3000ms', () => {
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    jest.runTimersToTime(2100)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(5)
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setThrottler).toHaveBeenCalledTimes(1)
    expect(spies.callStopTyping).not.toHaveBeenCalled()
    expect(spies.onStopTyping).not.toHaveBeenCalled()
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
    // only going to clear timeout if there is one
    expect(clearTimeout).toHaveBeenCalledTimes(1)
    wrapper.find('input').simulate('change')
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(3)
    expect(clearTimeout).toHaveBeenCalledTimes(2)
    jest.runTimersToTime(4999)
    expect(spies.onStartTyping).toHaveBeenCalledTimes(11)
    expect(spies.callStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(4)
    expect(clearTimeout).toHaveBeenCalledTimes(3)
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.setThrottler).toHaveBeenCalledTimes(1)
  })

  test('Should clear timeout on componentWillUnMount', () => {
    wrapper.find('input').simulate('change')
    wrapper.unmount()
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })

  test('Should call callStopTyping on refApplyCallStopTyping', () => {
    wrapper.find('input').simulate('change')
    expect(spies.callStartTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(1)
    refs.applySubmit()
    expect(spies.onStopTyping).toHaveBeenCalledTimes(1)
    expect(spies.clearTypingTimeout).toHaveBeenCalledTimes(2)
  })
})

describe('ErrorMessage', () => {
  test('Does not render an error Icon if suffix is defined', () => {
    const wrapper = mount(<Input suffix="Derek" />)
    const el = wrapper.find(ui.errorIcon)

    expect(el.length).toBe(0)
  })

  test('Can render an error Icon and suffix', () => {
    const wrapper = mount(<Input suffix="Derek" state="error" />)
    const error = wrapper.find(ui.errorIcon)
    const suffix = wrapper.find(ui.suffix)

    expect(error.length).toBe(1)
    expect(suffix.length).toBe(1)
  })

  test('Renders a Tooltip, if error', () => {
    const wrapper = mount(
      <Input suffix="Derek" state="error" errorMessage="Nope!" />
    )
    const el = wrapper.find('Tooltip')

    expect(el.length).toBe(1)
    expect(el.props().title).toBe('Nope!')
  })

  test('Can customize error Icon', () => {
    const wrapper = mount(
      <Input suffix="Derek" state="error" errorIcon="chat" />
    )
    const el = wrapper.find('Icon')

    expect(el.props().name).toBe('chat')
  })
})

describe('inlinePrefix/inlineSuffix', () => {
  test('Can render an inline prefix', () => {
    const wrapper = mount(<Input inlinePrefix="Words" />)
    const el = wrapper.find('.c-Input__inlinePrefix')

    expect(el.text()).toBe('Words')
  })

  test('Can render an inline suffix', () => {
    const wrapper = mount(<Input inlineSuffix="Words" />)
    const el = wrapper.find('.c-Input__inlineSuffix')

    expect(el.text()).toBe('Words')
  })

  test('Can render both inline prefix and suffix', () => {
    const wrapper = mount(<Input inlinePrefix="A lota" inlineSuffix="Words" />)
    const prefix = wrapper.find('.c-Input__inlinePrefix')
    const suffix = wrapper.find('.c-Input__inlineSuffix')

    expect(prefix.text()).toBe('A lota')
    expect(suffix.text()).toBe('Words')
  })
})

describe('Prefix', () => {
  test('Does not render a Prefix by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(Input.Prefix)

    expect(o.length).toBe(0)
  })

  test('Renders a prefix if specified', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input prefix={<Compo />} />)
    const pre = wrapper.find(Input.Prefix)
    const o = pre.find('div.Compo')

    expect(pre.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Suffix', () => {
  test('Does not render a Suffix by default', () => {
    const wrapper = mount(<Input />)
    const o = wrapper.find(Input.Suffix)

    expect(o.length).toBe(0)
  })

  test('Renders a Suffix if specified', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input suffix={<Compo />} />)
    const suf = wrapper.find(Input.Suffix)
    const o = suf.find('div.Compo')

    expect(suf.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Can render a Prefix and a Suffix', () => {
    const Compo = () => <div className="Compo">Hello</div>
    const wrapper = mount(<Input prefix={<Compo />} suffix={<Compo />} />)
    const pre = wrapper.find(Input.Prefix)
    const o = pre.find('div.Compo')
    const suf = wrapper.find(Input.Suffix)
    const p = suf.find('div.Compo')

    expect(pre.length).toBe(1)
    expect(o.length).toBe(1)
    expect(suf.length).toBe(1)
    expect(p.length).toBe(1)
  })
})

describe('innerRef', () => {
  test('Can retrieve innerRef DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Input innerRef={spy} />)
    const o = wrapper.find('input').getNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('computedStyles', () => {
  test('Does not set computed styles if height is falsey', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.setComputedStylesFromHeight(0)

    expect(o.computedStyles).toBeFalsy()
  })

  test('Does not set computed styles if inputNode is falsey', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.inputNode = undefined
    o.setComputedStylesFromHeight(50)

    expect(o.computedStyles).toBeFalsy()
  })

  test('Sets computed styles from input note', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()
    o.inputNode.style.paddingBottom = '100px'

    o.setComputedStylesFromHeight(50)

    expect(o.computedStyles.paddingBottom).toBe(100)
  })

  test('Does not set computedStyles again after caching', () => {
    const wrapper = mount(<Input multiline />)
    const o = wrapper.instance()

    o.inputNode.style.paddingBottom = '100px'
    o.setComputedStylesFromHeight(150)

    o.inputNode.style.paddingBottom = '500px'
    o.setComputedStylesFromHeight(550)

    expect(o.computedStyles.paddingBottom).toBe(100)
  })
})
