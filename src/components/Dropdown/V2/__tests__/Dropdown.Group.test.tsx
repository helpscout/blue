import * as React from 'react'
import { mount } from 'enzyme'
import { Group } from '../Dropdown.Group'
import { hasClass } from '../../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Group />)

    expect(hasClass(wrapper, 'c-DropdownV2Group')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Group className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Does render children', () => {
    const wrapper = mount(
      <Group>
        <div className="ron">Ron</div>
      </Group>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Group innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })
})
