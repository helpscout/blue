import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { noop } from '../../utilities/other'
import { isIntersectionObserverSupported } from './Page.utils'

class PageStickyActions extends React.PureComponent {
  static className = 'c-PageStickyActions'

  node = null
  observer = null
  state = {
    isSticky: true,
  }

  componentDidMount() {
    this.observerStart()
  }

  componentWillUnmount() {
    this.observerStop()
  }

  observerStart() {
    if (!isIntersectionObserverSupported()) return

    const { offset } = this.props
    const observerOptions = {
      root: null,
      rootMargin: `0px 0px ${offset * -1}px 0px`,
      threshold: 1.0,
    }
    this.observer = new IntersectionObserver(
      this.handleOnIntersect,
      observerOptions
    )
    this.observer.observe(this.node)
  }

  observerStop() {
    if (!isIntersectionObserverSupported()) return

    this.observer.unobserve(this.node)
    this.observer.disconnect()
  }

  handleOnIntersect = changes => {
    const { intersectionRatio } = changes[0]
    const isSticky = intersectionRatio !== 1

    this.updateSticky(isSticky)
  }

  updateSticky = isSticky => {
    const { onStickyStart, onStickyEnd } = this.props

    if (this.state.isSticky !== isSticky) {
      this.setState({ isSticky })

      isSticky ? onStickyStart(this.node) : onStickyEnd(this.node)
    }
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    return (
      <div {...getValidProps(this.props)} ref={this.setNodeRef}>
        {this.props.children}
      </div>
    )
  }
}

PageStickyActions.defaultProps = {
  'data-cy': 'PageStickyActions',
  innerRef: noop,
  offset: 10,
  onStickyStart: noop,
  onStickyEnd: noop,
}

export default PageStickyActions
