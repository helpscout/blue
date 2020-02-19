import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import LoadingDots from '../LoadingDots'
import { isNodeElement, isNodeVisible } from '../../utilities/node'
import { noop } from '../../utilities/other'

class InfiniteScroller extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    offset: PropTypes.number,
    isLoading: PropTypes.bool,
    loading: PropTypes.bool,
    scrollParent: PropTypes.any,
    getScrollParent: PropTypes.func,
    onLoading: PropTypes.func,
    onLoaded: PropTypes.func,
    onScroll: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: props.isLoading,
      nodeScope: window,
    }
    this._isMounted = null
    this.node = null
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  static defaultProps = {
    getScrollParent: noop,
    offset: 0,
    isLoading: false,
    loading: false,
    onLoading: noop,
    onLoaded: noop,
    onScroll: noop,
  }

  _isMounted
  node

  componentDidMount() {
    this._isMounted = true
    this.setParentNode()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading && !this.state.isLoading) {
      this.handleOnLoading()
    }

    if (!nextProps.isLoading && this.state.isLoading) {
      this.handleOnLoaded()
    }
  }

  getScrollNodeTop = () => {
    const { nodeScope } = this.state
    if (nodeScope === window) {
      return window.scrollY
    } else {
      return nodeScope.scrollTop
    }
  }

  // This method is tested, but tested in separate parts.
  // Unable to validate isNodeVisible in this method. The isNodeVisible
  // has been thoroughly tested elsewhere.
  // The handleOnLoading method has been abstracted to be tested in
  // isolation.
  handleOnScroll(event) {
    const { offset, onScroll } = this.props
    const { isLoading, nodeScope } = this.state
    const isVisible = isNodeVisible({
      node: this.node,
      scope: nodeScope,
      offset,
      complete: true,
    })

    onScroll(event, {
      node: this.node,
      offset,
      scrollNode: nodeScope,
      scrollTop: this.getScrollNodeTop(),
      isVisible,
      isLoading,
    })

    if (isLoading || !isVisible) return

    this.handleOnLoading()
  }

  handleOnLoading() {
    const { onLoading } = this.props
    if (this._isMounted) {
      this.setState({
        isLoading: true,
      })
    }
    onLoading(() => {
      this.handleOnLoaded()
    })
  }

  handleOnLoaded() {
    const { onLoaded } = this.props
    // Prevents scrollable area for unexpectedly scrolling after
    // new items are injected.
    this.normalizeNodeScrollScroll(this.getNodeScrollTop())
    // Once the scroll position as been re-adjusted, then load new items
    onLoaded()

    if (this._isMounted && this.state.isLoading) {
      this.setState({
        isLoading: false,
      })
    }
  }

  getNodeScrollTop() {
    const { nodeScope } = this.state

    if (nodeScope !== window && nodeScope.scrollTop !== undefined) {
      return nodeScope.scrollTop
    } else {
      return nodeScope.scrollY
    }
  }

  normalizeNodeScrollScroll(scrollTop) {
    const { nodeScope } = this.state

    if (typeof scrollTop !== 'number') return

    if (nodeScope === window && nodeScope.scrollTo) {
      nodeScope.scrollTo(window.scrollX, scrollTop)
    } else if (nodeScope.scrollTop !== undefined) {
      nodeScope.scrollTop = scrollTop
    }
  }

  setParentNode() {
    const { getScrollParent, scrollParent } = this.props
    let nodeScope = getScrollParent({ node: this.node })
    nodeScope =
      isNodeElement(nodeScope) || nodeScope === window ? nodeScope : null

    if (!nodeScope && scrollParent) {
      // Tested, but Instabul isn't picking up the ternary null
      nodeScope = isNodeElement(scrollParent) ? scrollParent : null
    }

    if (!nodeScope) {
      const node = ReactDOM.findDOMNode(this)

      // Tested for node.parentNode, but not for window.
      // This is a super fail-safe. This will always be parentNode, with the
      // exception of document or window. Cannot be tested in JSDOM/Enzyme,
      // since it prohibits mounting on document.body directly.

      nodeScope = node && node.parentNode ? node.parentNode : window
    }

    this.setState({ nodeScope })
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {
      className,
      children,
      getScrollParent,
      loading,
      isLoading: propsIsLoading,
      onLoading,
      onLoaded,
      scrollParent,
      ...rest
    } = this.props
    const { isLoading, nodeScope } = this.state

    const handleOnScroll = this.handleOnScroll

    const componentClassName = classNames(
      'c-InfiniteScroller',
      isLoading && 'is-loading',
      className
    )

    const loadingMarkup = loading || <LoadingDots align="center" />
    const contentMarkup = isLoading ? loadingMarkup : children

    return (
      <div
        {...getValidProps(rest)}
        className={componentClassName}
        ref={this.setNodeRef}
      >
        <EventListener
          event="scroll"
          handler={handleOnScroll}
          scope={nodeScope}
        />
        {contentMarkup}
      </div>
    )
  }
}

export default InfiniteScroller
