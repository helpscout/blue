import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getComponentDefaultProp from '@helpscout/react-utils/dist/getComponentDefaultProp'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import Animate from '../Animate'
import KeypressListener from '../KeypressListener'
import Portal from '../Portal'
import Keys from '../../constants/Keys'
import {
  createUniqueIDFactory,
  createUniqueIndexFactory,
} from '../../utilities/id'
import { setupManager } from '../../utilities/globalManager'
import { classNames } from '../../utilities/classNames'
import { isFunction } from '../../utilities/is'
import { noop, requestAnimationFrame } from '../../utilities/other'
import matchPath from '../../utilities/react-router/matchPath'
import Content from './PortalWrapper.Content'

const defaultOptions = {
  id: 'PortalWrapper',
  timeout: 100,
  alwaysCloseIfLast: true,
}

const managerNamespace = 'HSDSPortalWrapperGlobalManager'
const uniqueIndex = createUniqueIndexFactory(1000)

const PortalWrapper = (options = defaultOptions) => ComposedComponent => {
  const extendedOptions = {
    ...defaultOptions,
    ...options,
  }

  const uniqueID = createUniqueIDFactory(extendedOptions.id)

  class PortalWrapper extends React.PureComponent {
    static defaultProps = {
      closeOnEscape: true,
      isOpen: false,
    }
    static contextTypes = {
      router: noop,
    }
    static childContextTypes = {
      closePortal: noop,
    }

    static displayName = `withPortal(${getComponentName(ComposedComponent)})`

    triggerComponent = null
    triggerNode = null
    _isMounted = false
    _portalWrapperId = uniqueIndex()

    // Welcome aboard, Mr. Manager!
    _MrManager = setupManager(managerNamespace)
    // Wow, I'm Mr. Manager!
    // Well, manager… we we just say manager.

    constructor(props, context) {
      super(props, context)
      const composedWrapperClassName = getComponentDefaultProp(
        ComposedComponent,
        'wrapperClassName'
      )
      const composedWrapperTimeout = getComponentDefaultProp(
        ComposedComponent,
        'timeout'
      )
      const timeout =
        props.timeout !== undefined
          ? props.timeout
          : composedWrapperTimeout !== undefined
          ? composedWrapperTimeout
          : extendedOptions.timeout

      this.state = {
        isOpen: props.isOpen,
        id: uniqueID(),
        timeout,
        wrapperClassName: classNames(
          props.wrapperClassName,
          composedWrapperClassName
        ),
      }
    }

    getChildContext() {
      return {
        closePortal: this.closePortal,
      }
    }

    componentDidMount() {
      const { path } = this.props
      this._isMounted = true
      this.setTriggerNode()

      if (this.routeMatches(path)) {
        this.openPortal()
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { isOpen, path } = nextProps

      if (this.routeMatches(path)) {
        return this.openPortal()
      }

      if (isOpen === this.props.isOpen) return false

      if (isOpen !== this.state.isOpen) {
        return isOpen ? this.openPortal() : this.forceClosePortal()
      }
    }

    componentDidUpdate() {
      if (!this.state.isOpen) {
        this.refocusTriggerNode()
      }
    }

    componentWillUnmount() {
      this._isMounted = false
      this.triggerComponent = null
      this.triggerNode = null
    }

    safeSetState(state, callback) {
      if (this._isMounted) {
        this.setState(state, callback)
      }
    }

    setTriggerNode() {
      if (this.triggerComponent) {
        this.triggerNode = ReactDOM.findDOMNode(this.triggerComponent)
      }
    }

    refocusTriggerNode() {
      if (this.triggerNode) {
        this.triggerNode.focus()
      }
    }

    // Note: This will need to be refactored when using a (future) version
    // of React Router that no longer relies/works on component.context.router
    routeMatches(path) {
      // Context will always exist, except for Enzyme shallow/mount rendered
      // instances.
      if (!this.context) return false

      const { exact } = this.props
      const { router } = this.context

      if (!router || !router.history) return false

      const { history } = router

      if (path && history && history.location) {
        return matchPath(history.location.pathname, { path, exact }) !== null
      } else {
        return false
      }
    }

    openPortal = () => {
      this.safeSetState({
        isOpen: true,
      })
    }

    closePortal = () => {
      if (this._MrManager.max() === this._portalWrapperId) {
        this.forceClosePortal()
      }
    }

    forceClosePortal = () => {
      this.safeSetState({
        isOpen: false,
      })
    }

    sequenceClosePortal(onClose) {
      requestAnimationFrame(() => onClose())
    }

    handleOnEsc = event => {
      if (this.state.isOpen) {
        event && event.stopPropagation()
        this.handleOnClose()
      }
    }

    handleOnClose = onClose => {
      const { onBeforeClose } = this.props
      if (isFunction(onClose)) {
        if (onBeforeClose) {
          onBeforeClose(() => this.sequenceClosePortal(onClose))
        } else {
          this.sequenceClosePortal(onClose)
        }
      } else {
        this.closePortal()
      }
    }

    renderTrigger() {
      const { trigger } = this.props
      const isValidTrigger = trigger && React.isValidElement(trigger)

      if (!isValidTrigger) return null

      const triggerOnClick = (...args) => {
        const { onClick } = trigger.props

        if (isFunction(onClick)) {
          onClick(...args)
        }
        this.openPortal()
      }

      const triggerRef = node => {
        const ref = trigger.ref
        if (isFunction(ref)) {
          ref(node)
        }
        this.triggerComponent = node
      }

      return React.cloneElement(trigger, {
        onClick: triggerOnClick,
        ref: triggerRef,
      })
    }

    renderPortal() {
      const {
        className,
        exact,
        isOpenProps,
        onBeforeClose,
        onBeforeOpen,
        onClose,
        onOpen,
        path,
        renderTo,
        trigger,
        timeout: timeoutProp,
        wrapperClassName: propsWrapperClassName,
        closeOnEscape,
        ...rest
      } = this.props

      // Remapping open/mount state for ComposedComponent
      const { id, isOpen: portalIsOpen, timeout, wrapperClassName } = this.state

      const openPortal = this.openPortal
      const handleOnClose = this.handleOnClose

      const uniqueIndex = getUniqueIndex(id, options.id)

      const zIndex =
        options.zIndex != null ? options.zIndex + uniqueIndex : null

      return (
        <Animate
          animateOnMount={false}
          timeout={portalIsOpen ? timeout : undefined}
          in={portalIsOpen}
          unmountOnExit
        >
          <Portal
            className={wrapperClassName}
            onBeforeClose={handleOnClose}
            onClose={onClose}
            onBeforeOpen={onBeforeOpen}
            onOpen={onOpen}
            id={id}
            renderTo={renderTo}
            timeout={timeout}
            {...rest}
          >
            <Content manager={this._MrManager} id={this._portalWrapperId}>
              <ComposedComponent
                className={className}
                openPortal={openPortal}
                closePortal={handleOnClose}
                onClose={onClose}
                portalIsOpen={portalIsOpen}
                portalIsMounted={portalIsOpen}
                forceClosePortal={this.forceClosePortal}
                trigger={trigger}
                zIndex={zIndex}
                {...rest}
              />
            </Content>
          </Portal>
        </Animate>
      )
    }

    renderEventListener() {
      const { closeOnEscape } = this.props
      return closeOnEscape ? (
        <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleOnEsc} />
      ) : null
    }

    render() {
      return (
        <div className="c-PortalWrapper">
          {this.renderEventListener()}
          {this.renderTrigger()}
          {this.renderPortal()}
        </div>
      )
    }
  }

  return hoistNonReactStatics(PortalWrapper, ComposedComponent)
}

function getUniqueIndex(id, namespace) {
  return parseInt(id.replace(namespace, ''), 10)
}

PortalWrapper.Content = Content

PortalWrapper.propTypes = Object.assign(Portal.propTypes, {
  closeOnEscape: PropTypes.bool,
  isOpen: PropTypes.bool,
  trigger: PropTypes.any,
  isOpenProps: PropTypes.bool,
  wrapperClassName: PropTypes.string,
})

export default PortalWrapper
