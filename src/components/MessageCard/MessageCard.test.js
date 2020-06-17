import React from 'react'
import { mount, render } from 'enzyme'
import { MessageCard } from './MessageCard'
import { TitleUI, SubtitleUI, BodyUI, ActionUI } from './MessageCard.css'
import { Animate } from '../index'
import { MessageCardButton as Button } from './MessageCard.Button'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<MessageCard />)
    const el = wrapper.find('.c-MessageCard')

    expect(el.length).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<MessageCard className={customClassName} />)
    const el = wrapper.find('.c-MessageCard')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Mobile', () => {
  test('Should not have mobile styles by default', () => {
    const wrapper = mount(<MessageCard />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-mobile')).toBeFalsy()
  })

  test('Should have mobile styles if specified', () => {
    const wrapper = mount(<MessageCard isMobile />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-mobile')).toBeTruthy()
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const wrapper = mount(<MessageCard />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-align-right')).toBeTruthy()
  })

  test('Can change alignment styles, if specified', () => {
    const wrapper = mount(<MessageCard align="left" />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-align-left')).toBeTruthy()
  })
})

describe('Animation', () => {
  test('Can customize animationSequence', () => {
    const wrapper = mount(<MessageCard animationSequence="scale" />)
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toBe('scale')
  })

  test('Can customize animationEasing', () => {
    const wrapper = mount(<MessageCard animationEasing="linear" />)
    const o = wrapper.find(Animate)

    expect(o.prop('easing')).toBe('linear')
  })

  test('Can customize animationDuration', () => {
    const wrapper = mount(<MessageCard animationDuration={123} />)
    const o = wrapper.find(Animate)

    expect(o.prop('duration')).toBe(123)
  })
})

describe('Body', () => {
  test('Does not render body if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(0)
  })

  test('Renders body if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard body="Santa!" />)
    const o = wrapper.find(BodyUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })

  test('Renders html in body', () => {
    const wrapper = mount(<MessageCard body="<span>Santa!</span>" />)
    const o = wrapper.find(BodyUI)

    expect(o.html()).toContain('<span>Santa!</span>')
  })
})

describe('Title', () => {
  test('Does not render title if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders title if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard title="Santa!" />)
    const o = wrapper.find(TitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Subtitle', () => {
  test('Does not render subtitle if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(0)
  })

  test('Renders subtitle if it is passed down as a prop', () => {
    const wrapper = mount(<MessageCard subtitle="Santa!" />)
    const o = wrapper.find(SubtitleUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Santa!')
  })
})

describe('Action', () => {
  test('Does not render action if is not passed down as a prop', () => {
    const wrapper = mount(<MessageCard />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(0)
  })

  test('Renders action if it is passed down as a prop', () => {
    const action = () => <div>Click here</div>
    const wrapper = mount(<MessageCard action={action} />)
    const o = wrapper.find(ActionUI)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Click here')
  })

  test('Should remove the box shadow', () => {
    const wrapper = mount(<MessageCard isWithBoxShadow={false} />)
    const el = wrapper.find('div.c-MessageCard')

    expect(el.getDOMNode().classList.contains('is-with-box-shadow')).toBeFalsy()
  })
})

describe('Message Button Children', () => {
  test('Can render children', () => {
    const children = 'Hello world'
    const wrapper = mount(<Button>{children}</Button>)

    expect(wrapper.html()).toContain(children)
  })
})

describe('Message Button onClick', () => {
  test('Can accept custom onClick callback', () => {
    const callback = jest.fn()
    const wrapper = mount(<Button onClick={callback}>Click Me</Button>)
    wrapper.simulate('click')

    expect(callback).toHaveBeenCalled()
  })
})
