import { isModifierKeyPressed } from '../keys'

describe('isModifierKeyPressed', () => {
  test('return true if ctrl is pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: true,
      metaKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return true if altKey is pressed', () => {
    const event = {
      altKey: true,
      ctrlKey: false,
      metaKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return true if metaKey is pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: false,
      metaKey: true,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return true if shiftKey is pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: true,
    }
    expect(isModifierKeyPressed(event)).toBe(true)
  })

  test('return false if all modifier keys are not pressed', () => {
    const event = {
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    }
    expect(isModifierKeyPressed(event)).toBe(false)
  })
})
