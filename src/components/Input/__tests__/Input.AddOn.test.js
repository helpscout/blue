import React from 'react'
import { mount } from 'enzyme'
import AddOn from '../Input.AddOn'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<AddOn />)

    expect(wrapper.getDOMNode().classList.contains('c-InputAddOn')).toBe(true)
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<AddOn className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <AddOn>
        <span className="child">Ron</span>
      </AddOn>
    )

    expect(wrapper.find('span.child').length).toBe(1)
  })
})

describe('Styles', () => {
  test('Can render isFirst styles', () => {
    const wrapper = mount(<AddOn isFirst />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isNotOnly styles', () => {
    const wrapper = mount(<AddOn isNotOnly />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isLast styles', () => {
    const wrapper = mount(<AddOn isLast />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(true)
  })
})
