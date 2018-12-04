import { isFirefox } from '../../utilities/browser'

export const COMPONENT_KEY = 'ScrollLock'

export function scrollLockX(event: any, stopPropagation: boolean) {
  // Disabled for Firefox
  /* istanbul ignore if */
  // Can't test this function in JSDOM
  if (isFirefox()) return
  const { deltaX } = event
  const scrollNode = event.currentTarget
  const { clientWidth, scrollWidth, scrollLeft } = scrollNode

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaX > 0 && deltaX > scrollWidth - clientWidth - scrollLeft) {
    scrollNode.scrollLeft = scrollWidth
    event.preventDefault()
  } else if (deltaX <= 0 && -deltaX > scrollLeft) {
    scrollNode.scrollLeft = 0
    event.preventDefault()
  }
}

export function scrollLockY(event: any, stopPropagation: boolean) {
  // Disabled for Firefox
  /* istanbul ignore if */
  // Can't test this function in JSDOM
  if (isFirefox()) return
  const scrollNode = event.currentTarget
  const { clientHeight, scrollHeight, scrollTop } = scrollNode
  const { deltaY } = event

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaY > 0 && deltaY > scrollHeight - clientHeight - scrollTop) {
    scrollNode.scrollTop = scrollHeight
    event.preventDefault()
  } else if (deltaY <= 0 && -deltaY > scrollTop) {
    scrollNode.scrollTop = 0
    event.preventDefault()
  }
}

export function handleWheelEvent(
  event: any,
  direction: 'x' | 'y',
  stopPropagation: boolean
) {
  if (direction === 'x') {
    return scrollLockX(event, stopPropagation)
  } else {
    return scrollLockY(event, stopPropagation)
  }
}
