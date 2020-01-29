import React from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarList, ChatInbox, ChatList } from '../src/index'
import AvatarSpec from '../src/utilities/specs/avatar.specs'

const stories = storiesOf('ChatInbox', module)

stories.add('default', () => (
  <div style={{ width: 300 }}>
    <ChatInbox>
      <ChatInbox.Header
        avatars={<AvatarList avatars={AvatarSpec.generate(4)} max={3} />}
        count={1}
      >
        Chats
      </ChatInbox.Header>
      <ChatInbox.Content>
        <ChatList>
          <ChatList.Item />
        </ChatList>
      </ChatInbox.Content>
    </ChatInbox>

    <ChatInbox isCollapsible>
      <ChatInbox.Header
        avatars={<AvatarList avatars={AvatarSpec.generate(4)} max={3} />}
        count={2}
      >
        Assigned
      </ChatInbox.Header>
      <ChatInbox.Content>
        <ChatList>
          <ChatList.Item />
          <ChatList.Item />
        </ChatList>
      </ChatInbox.Content>
    </ChatInbox>
  </div>
))
