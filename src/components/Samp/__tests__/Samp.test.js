import React from 'react'
import { mount } from 'enzyme'
import Text from '../../Text'
import Samp from '../Samp'

describe('Text', () => {
  test('Renders the "samp" version of the Text component', () => {
    const wrapper = mount(<Samp />)
    const o = wrapper.find(Text)
    const s = wrapper.find('samp')

    expect(o.length).toBeTruthy()
    expect(s.length).toBeTruthy()
  })
})
