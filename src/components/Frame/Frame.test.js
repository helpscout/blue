import React from 'react'
import { mount } from 'enzyme'
import Frame from 'react-frame-component'
import styled, { __PRIVATE__ } from 'styled-components'
import Frame from '../index'

const { masterSheet } = __PRIVATE__

const getStyleProp = (node, prop = 'display') =>
  window.getComputedStyle(node)[prop]

const resetStyleTags = () => {
  masterSheet.names = new Map()
  masterSheet.clearTag()
}

function getClassListAsString(wrappedComponent) {
  return wrappedComponent.getDOMNode().classList.toString()
}

function getEmotionClassName(wrappedComponent) {
  const classList = getClassListAsString(wrappedComponent).split(' ')
  return classList.find(c => c.includes('css-'))
}

describe('Frame', () => {
  afterEach(() => {
    resetStyleTags()
  })

  test('Can render without children', () => {
    const wrapper = mount(<Frame />)

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render a single child', () => {
    const wrapper = mount(
      <Frame>
        <div />
      </Frame>
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render a multiple children', () => {
    const wrapper = mount(
      <Frame>
        <div />
        <div />
        <div />
      </Frame>
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Does not affect styles if no iFrame is present', () => {
    const Compo = styled('span')`
      color: red;
    `
    const wrapper = mount(
      <Frame>
        <Compo />
      </Frame>
    )
    const el = wrapper.find('span').getNode()

    expect(getStyleProp(el, 'color')).toBe('red')
  })

  test('Can render within an iFrame', () => {
    const Compo = styled('span')`
      color: red;
    `
    const wrapper = mount(
      <Frame>
        <Frame>
          <Compo />
        </Frame>
      </Frame>
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can extend/merge styles within an iFrame', () => {
    const One = styled('span')`
      color: red;
    `

    const Two = styled(One)`
      background: white;
      padding: 20px;
    `

    const wrapper = mount(
      <Frame>
        <div>
          <One className="one" />
          <Two className="two" />
        </div>
      </Frame>
    )

    const first = wrapper.find('.one')
    const second = wrapper.find('.two')

    const firstClassList = getClassListAsString(first).split(' ')
    const secondClassList = getClassListAsString(second).split(' ')

    expect(firstClassList.length).toBe(secondClassList.length)
    expect(getEmotionClassName(first)).not.toEqual(getEmotionClassName(second))
  })
})
