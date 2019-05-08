import * as React from 'react'
import { MessageChat, MessageThemeContext } from './Message.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import ChatBlock from './Message.ChatBlock'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import css from './styles/Action.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageChat & {
  className?: string
  icon?: string
}
type Context = MessageThemeContext

export const Action = (props: Props, context: Context) => {
  const {
    children,
    className,
    from,
    icon,
    isNote,
    ltr,
    rtl,
    to,
    read,
    timestamp,
    type,
    ...rest
  } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageAction',
    theme && `is-theme-${theme}`,
    className
  )

  const isThemeEmbed = theme === 'embed'
  const textSize = '12'
  const textShade = isThemeEmbed ? 'faint' : 'muted'

  return (
    <ChatBlock
      from={from}
      ltr={ltr}
      read={read}
      rtl={rtl}
      timestamp={timestamp}
      to={to}
      type="action"
    >
      <div {...getValidProps(rest)} className={componentClassName}>
        <Text
          className="c-MessageAction__text"
          shade={textShade}
          size={textSize}
        >
          {children}
        </Text>
      </div>
    </ChatBlock>
  )
}

// TODO: fix typescript complains
// @ts-ignore
Action.contextTypes = {
  theme: noop,
}

namespaceComponent(COMPONENT_KEY.Action)(Action)

export default styled(Action)(css)
