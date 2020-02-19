import * as React from 'react'
import { MessageBubble } from './Message.types'
import Bubble from './Message.Bubble'
import Caption from './Message.Caption'
import ChatBlock, { MetaPosition } from './Message.ChatBlock'
import Flexy from '../Flexy'
import Spinner from '../Spinner'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import css from './styles/Chat.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageBubble & {
  bubbleClassName?: string
  captionSize?: string
  caption?: string
  errorMessage?: string
  error?: boolean | string
  isLoading?: boolean
  metaPosition?: MetaPosition
  onBubbleClick: (event: Event) => void
}

export class Chat extends React.PureComponent<Props> {
  static defaultProps = {
    onBubbleClick: noop,
    error: false,
    errorMessage: "Couldn't send.",
    isLoading: false,
    metaPosition: 'bottom',
  }
  static displayName = 'Message.Chat'

  render() {
    const {
      body,
      bubbleClassName,
      caption,
      captionSize,
      metaPosition,
      children,
      className,
      error,
      errorMessage,
      read,
      from,
      icon,
      isLoading,
      isNote,
      ltr,
      onBubbleClick,
      rtl,
      size,
      timestamp,
      title,
      to,
      typing,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-MessageChat',
      from && 'is-from',
      to && 'is-to',
      className
    )

    const chatProps = {
      body,
      children,
      from,
      icon,
      ltr,
      rtl,
      timestamp,
      to,
    }

    const captionMarkup = caption ? (
      <Caption className="c-MessageChat__caption" size={captionSize}>
        {caption}
      </Caption>
    ) : null

    const loadingMarkup = isLoading ? (
      <Flexy.Item className="c-MessageChat__metaState">
        <Spinner className="c-MessageChat__loadingSpinner" size="xs" />
      </Flexy.Item>
    ) : null

    const errorMarkup = error ? (
      <div className="c-MessageChat__error">
        <Caption className="c-MessageChat__errorMessage">
          {typeof error === 'string' ? error : errorMessage}
        </Caption>
      </div>
    ) : null

    const metaMarkup = (
      <Flexy className="c-MessageChat__meta" gap="xs">
        {loadingMarkup}
        <Flexy.Block className="c-MessageChat__metaBlock">
          {captionMarkup}
          {errorMarkup}
        </Flexy.Block>
      </Flexy>
    )

    return (
      <ChatBlock
        className={componentClassName}
        meta={metaMarkup}
        metaPosition={metaPosition}
        read={read}
        {...chatProps}
        {...rest}
      >
        <Bubble
          {...chatProps}
          className={bubbleClassName}
          onClick={onBubbleClick}
          isNote={isNote}
          size={size}
          title={title}
          typing={typing}
        />
      </ChatBlock>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Chat)(Chat)

export default styled(Chat)(css)
