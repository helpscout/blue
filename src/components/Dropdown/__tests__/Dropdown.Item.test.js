import React from 'react'
import { mount, shallow } from 'enzyme'
import Item from '../Dropdown.Item'
import { default as Menu, MenuComponent } from '../Dropdown.Menu'
import Icon from '../../Icon'

const LINK_CLASSNAME = 'c-DropdownItem__link'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('div.c-DropdownItem')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Item className={customClass} />)
    const el = wrapper.find('div.c-DropdownItem')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('TabIndex', () => {
  test('Is set to -1', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.find(`.${LINK_CLASSNAME}`).props().tabIndex).toBe(-1)
  })
})

describe('Styles', () => {
  test('Adds isHover className if applicable', () => {
    const wrapper = shallow(<Item isHover />)

    expect(wrapper.hasClass('is-hover')).toBeTruthy()
  })

  test('Adds isFocus className if applicable', () => {
    const wrapper = shallow(<Item isFocused />)

    expect(wrapper.hasClass('is-focused')).toBeTruthy()
  })
})

describe('isOpen', () => {
  test('Is false by default', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.state().isOpen).not.toBeTruthy()
  })

  test('Is set by isOpen', () => {
    const wrapper = shallow(<Item isOpen />)

    expect(wrapper.state().isOpen).toBeTruthy()
  })

  test('Can be updated by isOpen prop change', () => {
    const wrapper = shallow(<Item isOpen />)

    expect(wrapper.state().isOpen).toBeTruthy()

    wrapper.setProps({ isOpen: false })

    expect(wrapper.state().isOpen).not.toBeTruthy()
  })
})

describe('Sub menu', () => {
  test('Can detect a sub-menu', () => {
    const wrapper = mount(
      <Item>
        Nested
        <Menu />
      </Item>
    )
    const o = wrapper.instance()

    expect(o.menu).toBeTruthy()
  })

  test('Does not render the sub-menu by default', () => {
    const wrapper = mount(
      <Item>
        Nested
        <Menu />
      </Item>
    )

    expect(wrapper.find(Menu).length).not.toBeTruthy()
  })

  test('Renders the sub-menu when Item isOpen', () => {
    const wrapper = mount(
      <Item isOpen>
        Nested
        <Menu />
      </Item>
    )

    expect(wrapper.find(Menu).length).toBeTruthy()
  })

  test('Moves item children to appropriate DOM structures, if sub-menu is present', () => {
    const wrapper = mount(
      <Item>
        Nested
        <Menu />
      </Item>
    )
    wrapper.setProps({ isHover: true })
    const o = wrapper.find('div.c-DropdownItem__content')
    const n = wrapper.find('.c-DropdownItem__menu')

    expect(o.length).toBeTruthy()
    expect(o.html()).toContain('Nested')
    expect(n.length).toBeTruthy()
    expect(n.find(Menu).length).toBeTruthy()
  })

  test('Shows a right caret icon when there is a sub-menu', () => {
    const wrapper = mount(
      <Item>
        Nested
        <Menu />
      </Item>
    )

    const o = wrapper.find(Icon)

    expect(o.length).toBeTruthy()
    expect(o.props().name).toBe('caret-right')
  })

  test('Has a default direction of right', () => {
    const wrapper = mount(
      <Item isOpen>
        Nested
        <Menu />
      </Item>
    )

    const o = wrapper.find(Menu)

    expect(o.props().direction).toBe('right')
  })

  test('Can override default direction', () => {
    const wrapper = mount(
      <Item isOpen>
        Nested
        <Menu direction="down" />
      </Item>
    )

    const o = wrapper.find(Menu)

    expect(o.props().direction).toBe('down')
  })

  test('Has a default selectedIndex of 0', () => {
    const wrapper = mount(
      <Item isOpen>
        Nested
        <Menu />
      </Item>
    )

    const o = wrapper.find(Menu)

    expect(o.props().selectedIndex).toBe(0)
  })

  test('Can set a selectedIndex', () => {
    const wrapper = mount(
      <Item isOpen>
        Nested
        <Menu selectedIndex={3} />
      </Item>
    )

    const o = wrapper.find(Menu)

    expect(o.props().selectedIndex).toBe(3)
  })
})

describe('Events', () => {
  test('onBlur should fire a callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onBlur={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus should fire a callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onFocus={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick should fire a callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onClick={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick should not fire if there is a sub-menu', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Item onClick={spy} isOpen>
        <MenuComponent />
      </Item>
    )
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })

  test('onMouseEnter should fire a callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onMouseEnter={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('mouseenter')

    expect(spy).toHaveBeenCalled()
  })

  test('onMouseLeave should fire a callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onMouseLeave={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('mouseleave')

    expect(spy).toHaveBeenCalled()
  })

  test('Enter keypress simulates click event', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onClick={spy} />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('keydown', { keyCode: 13 })

    expect(spy).toHaveBeenCalled()
  })

  test('Enter keypress simulates mouseneter event with sub-menu', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Item onMouseEnter={spy}>
        Nested
        <Menu />
      </Item>
    )
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('keydown', { keyCode: 13 })

    expect(spy).toHaveBeenCalled()
  })

  test('onSelect should return the value, onClick', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onSelect={spy} value="Brick" />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('click')

    expect(spy).toHaveBeenCalledWith('Brick')
  })

  test('Enter keypress should return the value', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onSelect={spy} value="Brick" />)
    const o = wrapper.find(`.${LINK_CLASSNAME}`)

    o.simulate('keydown', { keyCode: 13 })

    expect(spy).toHaveBeenCalledWith('Brick')
  })
})

describe('Disabled', () => {
  test('Is not disabled by default', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.instance().props.disabled).not.toBeTruthy()
    expect(wrapper.hasClass('is-disabled')).not.toBeTruthy()
  })

  test('Can be set to disabled', () => {
    const wrapper = shallow(<Item disabled />)

    expect(wrapper.instance().props.disabled).toBeTruthy()
    expect(wrapper.hasClass('is-disabled')).toBeTruthy()
  })

  test('onClick callback cannot be fired, if disabled', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Item disabled onClick={spy} />)
    const o = wrapper.find('.c-DropdownItem__link')

    o.simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not render sub-menu if open, and disabled', () => {
    const wrapper = mount(
      <Item disabled>
        <MenuComponent />
      </Item>
    )
    const o = wrapper.find('c-DropdownItem__menu')

    expect(o.length).not.toBeTruthy()
  })
})

describe('Closing', () => {
  test('Fires onMenuClose callback when menu closing', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onMenuClose={spy} />)

    // Mock the interaction...
    wrapper.instance().handleOnMenuClose()

    expect(spy).toHaveBeenCalled()
  })
})
