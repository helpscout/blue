import * as React from 'react'
import { mount } from 'enzyme'
import DropdownMenuPortal from '../Dropdown.MenuPortal'

jest.useFakeTimers()

test('Renders a Portal if isOpen', () => {
  const wrapper = mount(
    <DropdownMenuPortal isOpen={true}>
      <div />
    </DropdownMenuPortal>
  )

  jest.runOnlyPendingTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBe(1)
})

test('Does not render a Portal if isOpen is false', () => {
  const wrapper = mount(
    <DropdownMenuPortal isOpen={false}>
      <div />
    </DropdownMenuPortal>
  )

  jest.runOnlyPendingTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBe(0)
})
