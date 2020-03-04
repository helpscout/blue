import * as React from 'react'
import { MessageBubble, MessageThemeContext } from './Message.types'
import { noop } from '../../utilities/other'
import { isNativeSpanType } from '@helpscout/react-utils/dist/isType'
import compose from '@helpscout/react-utils/dist/compose'
import TypingDots from '../TypingDots'
import Icon from '../Icon'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import {
  convertLinksToHTML,
  isWord,
  newlineToHTML,
  textIncludesOnlyEmoji,
} from '../../utilities/strings'
import {
  MessageBubbleBody,
  MessageBubbleFrom,
  MessageBubbleUI,
  MessageBubbleIconWrapper,
  MessageBubbleTitle,
  MessageBubbleTyping,
} from './styles/Bubble.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageBubble
type Context = MessageThemeContext

// convertLinksToHTML will escape for output as HTML
const enhanceBody = compose(
  newlineToHTML,
  convertLinksToHTML
)

export const Bubble = (props: Props, context: Context) => {
  const {
    body,
    children,
    className,
    from,
    icon,
    isNote,
    ltr,
    rtl,
    size,
    timestamp,
    title,
    to,
    typing,
    ...rest
  } = props
  const { theme } = context

  const isThemeNotifications = theme === 'notifications'
  const isThemeEmbed = theme === 'embed'
  const fromName = from && typeof from === 'string' ? from : null

  let showEmojiOnlyStyles = false

  const fromMarkup =
    isThemeNotifications && fromName ? (
      <MessageBubbleFrom
        className="c-MessageBubble__from"
        isEmbed={isThemeEmbed}
      >
        <Text className="c-MessageBubble__fromText" lineHeightReset size="11">
          {fromName}
        </Text>
      </MessageBubbleFrom>
    ) : null

  const iconMarkup = icon ? (
    <MessageBubbleIconWrapper className="c-MessageBubble__iconWrapper">
      <Icon
        className="c-MessageBubble__icon"
        name={icon}
        size="20"
        shade="extraMuted"
      />
    </MessageBubbleIconWrapper>
  ) : null

  const titleMarkup = title ? (
    <MessageBubbleTitle className="c-MessageBubble__title" size="small">
      {title}
    </MessageBubbleTitle>
  ) : null

  const hasOnlyOneChild = React.Children.count(children) === 1

  const childrenMarkup = React.Children.map(children, child => {
    showEmojiOnlyStyles =
      !isThemeEmbed && hasOnlyOneChild && textIncludesOnlyEmoji(child)
    const fontSize = isThemeEmbed ? '13' : showEmojiOnlyStyles ? 48 : '14'

    return isWord(child) || isNativeSpanType(child) ? (
      <MessageBubbleBody
        className="c-MessageBubble__body"
        isEmbed={isThemeEmbed}
        showEmojiOnlyStyles={showEmojiOnlyStyles}
      >
        <Text wordWrap lineHeightInherit size={fontSize}>
          {child}
        </Text>
      </MessageBubbleBody>
    ) : (
      child
    )
  })

  const renderBody = () => {
    if (!body) {
      return childrenMarkup
    }

    showEmojiOnlyStyles = !isThemeEmbed && textIncludesOnlyEmoji(body)

    if (showEmojiOnlyStyles) {
      return (
        <MessageBubbleBody
          className="c-MessageBubble__body"
          showEmojiOnlyStyles={showEmojiOnlyStyles}
        >
          <Text wordWrap lineHeightInherit size={48}>
            {body}
          </Text>
        </MessageBubbleBody>
      )
    }
    return (
      <MessageBubbleBody
        className="c-MessageBubble__body"
        isEmbed={isThemeEmbed}
        dangerouslySetInnerHTML={{
          __html: enhanceBody(body),
        }}
      />
    )
  }

  const innerContentMarkup = typing ? (
    <MessageBubbleTyping className="c-MessageBubble__typing">
      <TypingDots />
    </MessageBubbleTyping>
  ) : (
    renderBody()
  )

  const contentMarkup = (
    <div className="c-MessageBubble__content">
      {iconMarkup}
      <div className="c-MessageBubble__bodyWrapper">{innerContentMarkup}</div>
    </div>
  )

  const componentClassName = classNames(
    'c-MessageBubble',
    from && 'is-from',
    icon && 'withIcon',
    isNote && 'is-note',
    size && `is-${size}`,
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    theme && `is-theme-${theme}`,
    to && 'is-to',
    typing && 'is-typing',
    showEmojiOnlyStyles && 'emoji-only',
    className
  )

  return (
    <MessageBubbleUI
      {...rest}
      className={componentClassName}
      isEmbed={isThemeEmbed}
      showEmojiOnlyStyles={showEmojiOnlyStyles}
    >
      {fromMarkup}
      {titleMarkup}
      {contentMarkup}
    </MessageBubbleUI>
  )
}

Bubble.contextTypes = {
  theme: noop,
}

namespaceComponent(COMPONENT_KEY.Bubble)(Bubble)

export default Bubble
