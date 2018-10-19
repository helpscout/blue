import React from 'react'
import { mount } from 'enzyme'
import Image from '../Image'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Image />)

    expect(wrapper.hasClass('c-SkeletonImage')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Image className="ron" />)

    expect(wrapper.hasClass('c-SkeletonImage')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})
