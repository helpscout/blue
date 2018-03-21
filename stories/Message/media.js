import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../../src/index.js'

const stories = storiesOf('Message/Media', module)
const imageUrl = 'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'

stories.add('default', () => (
  <Message.Provider theme='embed'>
    <Message from avatar={<Avatar name='Arctic Puffin' />}>
      <Message.Chat>
        Hey Buddy!
      </Message.Chat>
      <Message.Media imageUrl={imageUrl} caption='image.jpg' />
    </Message>

    <Message to avatar={<Avatar name='Arctic Puffin' />}>
      <Message.Media imageUrl={imageUrl} caption='image.jpg' />
    </Message>
  </Message.Provider>
))

stories.add('states', () => (
  <Message.Provider theme='embed'>
    <Message from avatar={<Avatar name='Arctic Puffin' />}>
      <Message.Chat>
        Error
      </Message.Chat>
      <Message.Media
        caption='image.jpg'
        error
        imageUrl={imageUrl}
      />
      <Message.Chat>
        Uploading
      </Message.Chat>
      <Message.Media
        caption='image.jpg'
        isUploading
        imageUrl={imageUrl}
      />
    </Message>
  </Message.Provider>
))
