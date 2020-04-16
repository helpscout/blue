import React from 'react'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import Tooltip from '../Tooltip'
import { classNames } from '../../utilities/classNames'
import { truncateMiddle } from '../../utilities/strings'
import { TruncateUI, TruncateWithSplitterUI } from './Truncate.css'
import { TRUNCATED_CLASSNAMES } from './Truncate.utils'

export class Truncate extends React.PureComponent {
  static displayName = 'Truncate'
  static defaultProps = {
    ellipsis: '…',
    limit: 0,
    showTooltipOnTruncate: false,
    tooltipModifiers: {},
    tooltipPlacement: 'top-start',
    tooltipProps: {},
    type: 'auto',
  }
  node = null
  contentNode = null
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isTruncated: !!props.type,
    }
  }

  componentDidMount() {
    this._isMounted = true

    // The timeout is necessary to ensure the `isTruncated` calculation
    // happens after the content has been rendered to the page. The
    // _isMounted guard is necessary because sometimes the callback
    // will run after the component has been unmounted, which results
    // in a warning.
    setTimeout(() => {
      if (this.props.type === 'auto' && this._isMounted) {
        this.setState({
          isTruncated: this.isTruncated(this.props),
        })
      }
    }, 0)
  }

  componentWillUnmount() {
    this.node = null
    this.contentNode = null
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      this.setState({
        isTruncated: this.isTruncated(nextProps),
      })
    }
  }

  handleOnResize = () => {
    if (!this.props.showTooltipOnTruncate) return

    const isTruncated = this.isTruncated(this.props)
    if (isTruncated === this.state.isTruncated) return

    this.setState({ isTruncated })
  }

  isTruncated = (props = this.props) => {
    if (props.type !== 'auto') {
      return this.getText(props) !== this.getTruncatedContent(props)
    } else {
      if (!this.node || !this.contentNode) return false

      const isContentTruncated = props.splitter
        ? this.isSplitContentTruncated(this.contentNode, this.node)
        : this.contentNode.scrollWidth > this.node.offsetWidth

      return isContentTruncated
    }
  }

  isSplitContentTruncated = (contentNode, node) => {
    return (
      contentNode.offsetWidth <
      node.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`).scrollWidth +
        node.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`).scrollWidth
    )
  }

  getText = (props = this.props) => {
    return this.props.text || this.props.children
  }

  getTruncatedContent = (props = this.props) => {
    return getTruncatedContent({ ...props, text: this.getText(props) })
  }

  render() {
    const {
      children,
      className,
      ellipsis,
      limit,
      showTooltipOnTruncate,
      splitter,
      tooltipPlacement,
      tooltipProps,
      tooltipModifiers,
      title,
      text,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Truncate',
      type && `is-${type}`,
      className
    )

    const shouldShowTooltip = showTooltipOnTruncate && this.state.isTruncated
    let truncatedText

    if (splitter) {
      const str = text || children
      const [first, second] = str.split(splitter)

      truncatedText = (
        <TruncateWithSplitterUI
          className={`${TRUNCATED_CLASSNAMES.component} ${TRUNCATED_CLASSNAMES.withSplitter}`}
        >
          <span className={`${TRUNCATED_CLASSNAMES.firstChunk}`}>{first}</span>
          <span className={`${TRUNCATED_CLASSNAMES.secondChunk}`}>
            {splitter}
            {second}
          </span>
        </TruncateWithSplitterUI>
      )
    } else {
      truncatedText = this.getTruncatedContent()
    }

    const textMarkup = (
      <span
        className="c-Truncate__content"
        ref={ref => (this.contentNode = ref)}
      >
        {truncatedText}
      </span>
    )
    const content = shouldShowTooltip ? (
      <Tooltip
        {...tooltipProps}
        display="block"
        placement={tooltipPlacement}
        title={title || this.getText()}
      >
        {textMarkup}
      </Tooltip>
    ) : (
      textMarkup
    )

    return (
      <TruncateUI
        className={componentClassName}
        ref={ref => (this.node = ref)}
        {...rest}
      >
        <EventListener event="resize" handler={this.handleOnResize} />
        {content}
      </TruncateUI>
    )
  }
}

/**
 * Generates the truncated content based on props.
 *
 * @param   {Object} props Component props.
 * @returns {string} The truncated content.
 */
export function getTruncatedContent(props) {
  const { ellipsis, limit, type, text } = props

  let truncateStart
  let truncateEnd

  switch (type) {
    case 'start':
      truncateStart = 0
      truncateEnd = limit
      break
    case 'middle':
      truncateStart = Math.floor(limit / 2)
      truncateEnd = Math.floor(limit / 2)
      break
    default:
      truncateStart = limit
      truncateEnd = 0
  }

  const word =
    type !== 'auto'
      ? truncateMiddle(text, truncateStart, truncateEnd, ellipsis)
      : text

  return word
}

Truncate.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  ellipsis: PropTypes.string,
  limit: PropTypes.number,
  end: PropTypes.number,
  start: PropTypes.number,
  showTooltipOnTruncate: PropTypes.bool,
  splitter: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  tooltipProps: PropTypes.object,
  tooltipPlacement: PropTypes.string,
  tooltipModifiers: PropTypes.object,
  type: PropTypes.oneOf(['auto', 'start', 'middle', 'end']),
}

export default Truncate