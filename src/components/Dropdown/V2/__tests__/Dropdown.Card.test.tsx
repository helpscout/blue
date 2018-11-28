import * as React from 'react'
import { mount } from 'enzyme'
import { Card } from '../Dropdown.Card'
import { hasClass } from '../../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Card />)

    expect(hasClass(wrapper, 'c-DropdownV2Card')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Card className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Card>
        <div className="ron">Ron</div>
      </Card>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    mount(<Card innerRef={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('Dimensions', () => {
  test('Can set dimension props', () => {
    const dimensions = {
      minHeight: 60,
      minWidth: 300,
      maxHeight: 260,
      maxWidth: 600,
    }
    const wrapper = mount(<Card {...dimensions} />)
    const el = wrapper.find('Card').first()
    const styles = el.prop('style') as any

    expect(styles.minHeight).toBe(60)
    expect(styles.minWidth).toBe(300)
    expect(styles.maxHeight).toBe(260)
    expect(styles.maxWidth).toBe(600)
  })
})
