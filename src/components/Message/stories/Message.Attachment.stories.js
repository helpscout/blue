import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../../index'

const stories = storiesOf('Components/Message', module)
const imageUrl =
  'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'

stories.add('Attachment', () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Attachment filename="file.png" url={imageUrl} />
    </Message>
  </Message.Provider>
))

stories.add('Attachment States', () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat>Error</Message.Chat>
      <Message.Attachment filename="file.png" error url={imageUrl} />
      <Message.Chat>Uploading</Message.Chat>
      <Message.Attachment filename="file.png" isUploading url={imageUrl} />
      <Message.Attachment filename="no-url.png" />
    </Message>
  </Message.Provider>
))