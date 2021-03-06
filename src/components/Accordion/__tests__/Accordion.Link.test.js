import React from 'react'
import { mount } from 'enzyme'
import Link from '../Accordion.Link'
import Title from '../Accordion.Title'
import Section from '../Accordion.Section'

describe('Section', () => {
  test('Renders the link variant of Section if to/href are defined', () => {
    const wrapper = mount(<Link to="/" />)
    const el = wrapper.find(Section)

    expect(el.prop('isLink')).toBe(true)
  })

  test('Renders a standard Section if to/href are not defined', () => {
    const wrapper = mount(<Link />)
    const el = wrapper.find(Section)

    expect(el.prop('isLink')).toBe(false)
  })
})

describe('Title', () => {
  test('Passes to prop to Title', () => {
    const wrapper = mount(<Link to="/page" />)
    const el = wrapper.find(Title)

    expect(el.prop('to')).toBe('/page')
  })

  test('Passes href prop to Title', () => {
    const wrapper = mount(<Link href="/page" />)
    const el = wrapper.find(Title)

    expect(el.prop('href')).toBe('/page')
  })
})
