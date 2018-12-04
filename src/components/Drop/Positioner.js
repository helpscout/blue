import React, { PureComponent as Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import { applyStylesToNode, isNodeElement } from '../../utilities/node'
import {
  getViewportPosition,
  getDirections,
} from '../../utilities/nodePosition'
import { noop } from '../../utilities/other'

export const propTypes = {
  autoPosition: PropTypes.bool,
  direction: PropTypes.string,
  offset: PropTypes.number,
  onUpdatePosition: PropTypes.func,
  position: PropTypes.shape({
    direction: PropTypes.shape({
      x: PropTypes.oneOf(['left', 'right', '']),
      y: PropTypes.oneOf(['up', 'down']),
    }),
    left: PropTypes.number,
    offsetTop: PropTypes.number,
    top: PropTypes.number,
  }),
  trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  zIndex: PropTypes.number,
}

const defaultProps = {
  autoPosition: true,
  direction: 'down',
  offset: 8,
  onUpdatePosition: noop,
  zIndex: 1000,
}

class Positioner extends Component {
  constructor(props) {
    super()
    /* istanbul ignore next */
    this.state = {
      direction: props.direction
        ? getDirections(props.direction)
        : getDirections(),
    }

    this.position = null
    this.node = null
    this.contentNode = null
    this.updatePosition = this.updatePosition.bind(this)
  }

  componentDidMount() {
    this.setTriggerNode()
    this.updatePosition()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position !== this.position) {
      this.updatePosition(nextProps.position)
    }
  }

  setTriggerNode() {
    const { trigger } = this.props
    /* istanbul ignore next */
    if (!this.triggerNode) {
      this.triggerNode = isNodeElement(trigger)
        ? trigger
        : ReactDOM.findDOMNode(trigger)
    }
  }

  getPosition() {
    const { direction, offset } = this.props

    /* istanbul ignore next */
    if (!this.triggerNode || !this.contentNode) return false

    /* istanbul ignore next */
    // the getOptimalViewportPosition method is tested.
    // However, I'm unable to test it with this component due to the difficulty
    // of setting up Enzyme to recognize the triggerNode
    return getViewportPosition({
      triggerNode: this.triggerNode,
      contentNode: this.contentNode,
      offset: offset,
      direction: getDirections(direction),
    })
  }

  /* istanbul ignore next */
  updatePosition(newPosition) {
    const { autoPosition, onUpdatePosition, position, zIndex } = this.props

    if (!autoPosition) return

    const pos = newPosition || position || this.getPosition()
    if (!pos) return

    // Cannot test transform style in JSDOM :'(
    // https://github.com/chad3814/CSSStyleDeclaration/pull/49
    const nodeStyles = {
      display: pos.offsetTop !== undefined ? 'block' : 'none',
      transform: `translate(${pos.left}px, ${pos.top}px)`,
      zIndex,
    }

    if (this.direction !== pos.direction) {
      this.setState({ direction: pos.direction })
    }

    this.position = pos

    /* istanbul ignore next */
    applyStylesToNode(this.node, nodeStyles)
    onUpdatePosition(pos)
  }

  render() {
    const {
      autoPosition,
      className,
      children,
      offset,
      onUpdatePosition,
      position,
      trigger,
      zIndex,
      ...rest
    } = this.props

    const { direction } = this.state

    const componentClassName = classNames(
      'c-DropPositioner',
      /* istanbul ignore next */
      // Tested, but istanbul is not picking it up
      direction.x && `is-${direction.x}`,
      direction.y && `is-${direction.y}`,
      className
    )

    const updatePosition = this.updatePosition

    return (
      <div
        className={componentClassName}
        ref={node => {
          this.node = node
        }}
        {...rest}
      >
        <EventListener event="resize" handler={() => updatePosition()} />
        <div
          className="c-DropPositioner__content"
          ref={node => {
            this.contentNode = node
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

Positioner.propTypes = propTypes
Positioner.defaultProps = defaultProps
Positioner.displayName = 'DropPositioner'

export default Positioner
