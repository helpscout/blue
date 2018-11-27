import React from 'react'
import StatusBadge from '../index'
import { Animate, Badge, StatusDot } from '../../index'
import { mount } from 'enzyme'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<StatusBadge />)

    expect(
      wrapper.getDOMNode().classList.contains('c-StatusBadge')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<StatusBadge className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Does not render children', () => {
    const wrapper = mount(<StatusBadge>123</StatusBadge>)

    expect(wrapper.text()).not.toBe('123')
  })

  test('Renders string with commas', () => {
    const wrapper = mount(<StatusBadge count="123,456" />)

    expect(wrapper.text()).toBe('123,456')
  })

  test('Renders number', () => {
    const wrapper = mount(<StatusBadge count={456} />)

    expect(wrapper.text()).toBe('456')
  })
})

describe('Count', () => {
  test('Renders string', () => {
    const wrapper = mount(<StatusBadge count="123" />)

    expect(wrapper.text()).toBe('123')
  })

  test('Renders string with commas', () => {
    const wrapper = mount(<StatusBadge count="123,456" />)

    expect(wrapper.text()).toBe('123,456')
  })

  test('Renders number', () => {
    const wrapper = mount(<StatusBadge count={456} />)

    expect(wrapper.text()).toBe('456')
  })
})

describe('Badge', () => {
  test('Renders count into a Badge', () => {
    const wrapper = mount(<StatusBadge count="123" />)
    const o = wrapper.find(Badge)

    expect(o.text()).toBe('123')
  })

  test('Badge has appropriate styles', () => {
    const wrapper = mount(<StatusBadge count="123" />)
    const o = wrapper.find(Badge)

    expect(o.props().isSquare).toBeTruthy()
  })
})

describe('StatusDot', () => {
  test('Does not render a StatusDot by default', () => {
    const wrapper = mount(<StatusBadge />)
    const o = wrapper.find(Animate)

    expect(o.prop('in')).toBe(false)
  })

  describe('BorderColor', () => {
    test('Does not have custom borderColor by default', () => {
      const wrapper = mount(<StatusBadge status="new" />)
      const o = wrapper.find('.c-StatusDot').first()

      expect(o.props().style.borderColor).toBeFalsy()
    })

    test('Can customize borderColor style', () => {
      const wrapper = mount(<StatusBadge borderColor="red" status="new" />)
      const o = wrapper.find('.c-StatusDot').first()

      expect(o.props().style.borderColor).toBe('red')
    })
  })

  describe('OuterBorderColor', () => {
    test('Does not have custom outerBorderColor by default', () => {
      const wrapper = mount(<StatusBadge status="new" />)
      const o = wrapper.find('.c-StatusDot').first()

      expect(o.props().style.boxShadow).toBeFalsy()
    })

    test('Can customize outerBorderColor style', () => {
      const wrapper = mount(<StatusBadge outerBorderColor="red" status="new" />)
      const o = wrapper.find('.c-StatusDot').first()

      expect(o.props().style.boxShadow).toContain('red')
    })

    test('Can customize outerBorderColor style + add custom style', () => {
      const wrapper = mount(<StatusBadge outerBorderColor="red" status="new" />)
      const o = wrapper.find('.c-StatusDot').first()

      expect(o.props().style.boxShadow).toContain('red')
    })
  })

  describe('Status', () => {
    test('Can render status styles, if defined', () => {
      const wrapper = mount(<StatusBadge status="offline" />)
      const o = wrapper.find(StatusDot).first()

      expect(o.getDOMNode().classList.contains('is-offline')).toBeTruthy()
      expect(o.getDOMNode().classList.contains('is-online')).not.toBeTruthy()
    })
  })
})
