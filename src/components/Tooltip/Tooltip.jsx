import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { isFunction } from '../../utilities/is'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import {
  ArrowUI,
  TooltipAnimationUI,
  TooltipTriggerUI,
  TooltipUI,
} from './Tooltip.css'
import { GlobalContext } from '../HSDS/Provider'

export const TooltipContext = createContext({})

const getClassName = className => classNames('c-Tooltip', className)

const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }) {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      },
    }
  },
}

const Tooltip = props => {
  const {
    animationDelay,
    animationDuration,
    arrowSize,
    children,
    className,
    closeOnContentClick,
    closeOnEscPress,
    display,
    'data-cy': dataCy,
    innerRef,
    isOpen,
    minWidth,
    maxWidth,
    placement,
    render: renderProp,
    renderContent,
    title,
    triggerOn,
    zIndex: zIndexProp,
    ...rest
  } = props

  const { getCurrentScope } = useContext(GlobalContext) || {}
  const { zIndex = zIndexProp, animationDuration: animationDurationContext } =
    useContext(TooltipContext) || {}
  const [isEntered, setEntered] = useState(animationDuration === 0)

  const scope = getCurrentScope ? getCurrentScope() : null
  const trigger = triggerOn === 'hover' ? 'mouseenter' : triggerOn

  const hasRenderContent = renderContent && isFunction(renderContent)
  const hasRender = renderProp && isFunction(renderProp)
  const shouldRenderTooltip = title || hasRenderContent || hasRender

  const duration = animationDurationContext
    ? animationDurationContext
    : animationDuration

  const tooltipProps = {
    className: getClassName(className),
    arrowSize,
    animationDuration: duration,
    'data-entered': isEntered,
    maxWidth,
    minWidth,
    ref: innerRef,
    scope: scope,
    tabIndex: '-1',
  }

  const renderTooltip = ({ scope, ...props }) => {
    let titleContent = null
    if (typeof title === 'string') {
      titleContent = <span dangerouslySetInnerHTML={{ __html: title }} />
    } else {
      titleContent = title
    }
    const toolTipComponent = (
      <TooltipAnimationUI>
        <TooltipUI {...props}>
          {renderContent ? renderContent() : titleContent}
          <ArrowUI size={arrowSize} data-popper-arrow />
        </TooltipUI>
      </TooltipAnimationUI>
    )

    return <div className={scope}>{toolTipComponent}</div>
  }

  const render = attrs => {
    const props = { ...tooltipProps, ...attrs }
    if (renderProp) return renderProp(props)
    return renderTooltip(props)
  }

  const onShow = () => {
    setTimeout(() => setEntered(true), animationDelay)
  }

  const onHide = () => {
    setEntered(false)
  }

  const extraProps = {}
  if (zIndex) {
    extraProps.zIndex = zIndex
  }

  if (!closeOnContentClick) {
    extraProps.interactive = true
    extraProps.interactiveBorder = 20
  }

  const plugins = []
  if (closeOnEscPress) {
    plugins.push(hideOnEsc)
  }

  const tippyProps = {
    onHide,
    onShow,
    placement,
    plugins,
    render,
    trigger,
    showOnCreate: isOpen,
    ...rest,
    ...extraProps,
  }

  if (!shouldRenderTooltip) {
    return children ? (
      <span {...getValidProps(rest)} className={getClassName(className)}>
        {children}
      </span>
    ) : null
  }

  return (
    <Tippy {...tippyProps}>
      <TooltipTriggerUI tabIndex="0" display={display} data-cy={dataCy}>
        {children}
      </TooltipTriggerUI>
    </Tippy>
  )
}

Tooltip.defaultProps = {
  animationDelay: 0,
  animationDuration: 200,
  arrowSize: 12,
  closeOnEscPress: true,
  'data-cy': 'Tooltip',
  display: null,
  isOpen: false,
  placement: 'top',
  triggerOn: 'mouseenter focus',
}

Tooltip.propTypes = {
  animationDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  /** Size of the Arrow in pixels */
  arrowSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Whether to allow closing the tooltip on pressing ESC */
  closeOnEscPress: PropTypes.bool,
  /** Apply custom css rule `display` */
  display: PropTypes.string,
  /** Determine if the tooltip is open via a prop */
  isOpen: PropTypes.bool,
  /** Max width for the component. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Min width for the component. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Renders a component within the Tooltip. Is prioritized over `title` */
  renderContent: PropTypes.func,
  /** Where to place the Tooltip. */
  placement: PropTypes.string,
  /** Text to display within the Tooltip. */
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Determines how to engage the component. */
  triggerOn: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Tooltip
