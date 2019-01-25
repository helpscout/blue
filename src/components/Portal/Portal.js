import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import contextConnect from '../PropProvider/contextConnect'
import PropProvider from '../PropProvider/PropProvider'
import Container, { ID as portalContainerId } from './Container'
import { isNodeElement } from '../../utilities/node'
import { isObject, isString } from '../../utilities/is'

export const propTypes = {
  className: PropTypes.string,
  exact: PropTypes.bool,
  id: PropTypes.string,
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number,
}

export class Portal extends React.Component {
  static propTypes = propTypes
  static defaultProps = {
    propProviderContextApp: 'blue',
    propProviderContextValue: {},
    timeout: 0,
  }
  static Container = Container
  static displayName = 'Portal'

  document = null
  node = null
  portal = null
  isOpening = false
  isOpen = false
  isClosing = false

  state = {
    mountSelector: null,
  }

  componentDidMount() {
    /* istanbul ignore next */
    this.document = getDocumentFromComponent(this) || window.document
    this.setState(
      {
        mountSelector: this.getMountSelector(),
      },
      () => {
        this.openPortal(this.props)
      }
    )
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (this.node && this.props.className !== nextProps.className) {
      this.node.className = nextProps.className
    }

    this.openPortal(nextProps)
  }

  componentWillUnmount() {
    setTimeout(() => {
      this.closePortal(this.props)
    }, this.props.timeout)
  }

  shouldComponentUpdate(nextProps) {
    return false
  }

  getMountSelector() {
    const { renderTo } = this.props
    let mountSelector
    // 1. Prioritize renderTo selector
    if (renderTo) {
      mountSelector = isString(renderTo)
        ? document.querySelector(renderTo)
        : false
      mountSelector =
        isObject(renderTo) && isNodeElement(renderTo) ? renderTo : mountSelector
    }
    // 2. Fallback to <Portal.Container />
    mountSelector =
      mountSelector || document.querySelector(`#${portalContainerId}`)
    // 3. Fallback to document.body
    return mountSelector || this.document.body // fallback
  }

  renderPortalContent = props => {
    const { propProviderContextApp, propProviderContextValue, children } = props
    if (!children || !React.isValidElement(children)) return

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <PropProvider
        app={propProviderContextApp}
        value={propProviderContextValue}
      >
        {children}
      </PropProvider>,
      this.node
    )
  }

  mountPortal = (props, state) => {
    const { className, id, onOpen } = props

    if (!this.state.mountSelector) return

    if (this.node) {
      this.renderPortalContent(props)
      return
    }

    this.node = document.createElement('div')
    this.node.className = className
    this.node.id = id
    // Render to specified target, instead of document
    this.state.mountSelector.appendChild(this.node)
    this.renderPortalContent(props)

    if (onOpen) onOpen(this)

    this.isOpening = false
    this.isOpen = true
  }

  unmountPortal = props => {
    /* istanbul ignore next */
    if (!this.node) return

    const { onClose } = props

    ReactDOM.unmountComponentAtNode(this.node)
    // Unmount from specified target, instead of document
    if (
      this.state.mountSelector &&
      this.node.parentNode === this.state.mountSelector
    ) {
      this.state.mountSelector.removeChild(this.node)
    }

    if (onClose) onClose(this)

    this.node = null
    this.portal = null
    this.isClosing = false
    this.isOpen = false
  }

  openPortal(props) {
    const { onBeforeOpen } = props

    if (onBeforeOpen) {
      /* istanbul ignore next */
      if (!this.isOpening && !this.isOpen) {
        this.isOpening = true
        onBeforeOpen(() => {
          this.mountPortal(props)
        })
      }
    } else {
      this.isOpening = true
      this.mountPortal(props)
    }
  }

  closePortal(props) {
    const { onBeforeClose } = props

    if (onBeforeClose) {
      /* istanbul ignore next */
      if (!this.isClosing) {
        this.isClosing = true
        onBeforeClose(() => {
          this.unmountPortal(props)
        })
      }
    } else {
      this.isClosing = true
      this.unmountPortal(props)
    }
  }

  render() {
    return null
  }
}

export default contextConnect()(Portal)
