import React from 'react'
import { mount } from 'enzyme'
import CopyButton from '../../CopyButton'
import Highlight from '../../Highlight'
import CopyCode from '../CopyCode'
import { CopyCodeUI } from '../styles/CopyCode.css.js'
import Keys from '../../../constants/Keys'

// Stub selection/range functions as they are not available in tests
window.getSelection = () => ({
  addRange: () => {},
  removeAllRanges: () => {},
  toString: () => {},
})

document.createRange = () => ({
  selectNodeContents: () => {},
})

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<CopyCode />)
    const el = wrapper.find('div.c-CopyCode')

    expect(el.hasClass('c-CopyCode')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<CopyCode className={className} />)
    const el = wrapper.find('div.c-CopyCode')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Copy button', () => {
  test('Clicking copy will call the onCopy handler', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    wrapper.find(CopyButton).simulate('click')
    expect(onCopySpy).toHaveBeenCalledWith(code)
  })
})

describe('Highlight', () => {
  test('Uses syntax highlighting with language specified', () => {
    const code = 'return true;'
    const wrapper = mount(<CopyCode code={code} language="php" />)

    expect(wrapper.find(Highlight).prop('language')).toBe('php')
  })
})

describe('Content editable', () => {
  test('Content is read only', () => {
    const code = 'return true;'
    const wrapper = mount(<CopyCode code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
      key: 'c',
    }

    expect(wrapper.find(CopyCodeUI).prop('onKeyDown')(eventSpy)).toBe(false)
    expect(eventSpy.preventDefault).toHaveBeenCalled()
  })

  test('Does not prevent control keyDown', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
      ctrlKey: true,
      key: 'c',
    }

    expect(wrapper.find(CopyCodeUI).prop('onKeyDown')(eventSpy)).toBe(true)
    expect(eventSpy.preventDefault).not.toHaveBeenCalled()
  })

  test('Does not prevent meta keyDown', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
      metaKey: true,
      key: 'c',
    }

    expect(wrapper.find(CopyCodeUI).prop('onKeyDown')(eventSpy)).toBe(true)
    expect(eventSpy.preventDefault).not.toHaveBeenCalled()
  })

  test('Does not prevent tab keyDown', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
      keyCode: Keys.TAB,
    }

    expect(wrapper.find(CopyCodeUI).prop('onKeyDown')(eventSpy)).toBe(true)
    expect(eventSpy.preventDefault).not.toHaveBeenCalled()
  })

  test('Does not prevent tab + shift keyDown', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
      shiftKey: true,
      keyCode: Keys.TAB,
    }

    expect(wrapper.find(CopyCodeUI).prop('onKeyDown')(eventSpy)).toBe(true)
    expect(eventSpy.preventDefault).not.toHaveBeenCalled()
  })

  test('Content cannot be pasted', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
    }

    expect(wrapper.find(CopyCodeUI).prop('onPaste')(eventSpy)).toBe(false)
    expect(eventSpy.preventDefault).toHaveBeenCalled()
  })

  test('Content cannot be cut', () => {
    const onCopySpy = jest.fn()
    const code = 'return true;'
    const wrapper = mount(<CopyCode onCopy={onCopySpy} code={code} />)

    const eventSpy = {
      preventDefault: jest.fn(),
    }

    expect(wrapper.find(CopyCodeUI).prop('onCut')(eventSpy)).toBe(false)
    expect(eventSpy.preventDefault).toHaveBeenCalled()
  })
})
