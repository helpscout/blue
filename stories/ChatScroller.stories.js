import React from 'react'
import { storiesOf } from '@storybook/react'
import { createSpec, faker } from '@helpscout/helix'
import {
  Avatar,
  ChatScroller,
  Link,
  Message,
  PreviewCard,
  Scrollable,
} from '../src/index.js'

const stories = storiesOf('ChatScroller', module)

const MessageSpec = createSpec({
  id: faker.random.uuid(),
  message: faker.lorem.sentence(),
})

class Chat extends React.Component {
  state = {
    messages: MessageSpec.generate(5),
    isTyping: false,
  }

  addMessage = () => {
    this.setState({
      messages: [...this.state.messages, MessageSpec.generate()],
    })
  }

  toggleTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.addMessage}>Add Message</button>
        <button onClick={this.toggleTyping}>Toggle Typing</button>
        <div style={{ width: 320, height: 300 }}>
          <ChatScroller
            messages={this.state.messages}
            isTyping={this.state.isTyping}
          >
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <Scrollable>
                <div style={{ padding: '0 15px' }}>
                  <Message from avatar={<Avatar name="Arctic Puffin" />}>
                    {this.state.messages.map(props => (
                      <Message.Chat key={props.id}>
                        {props.message}
                      </Message.Chat>
                    ))}
                  </Message>
                  {this.state.isTyping && <Message.Chat typing />}
                </div>
              </Scrollable>
            </div>
          </ChatScroller>
        </div>
      </div>
    )
  }
}

stories.add('default', () => (
  <div style={{ width: 400, height: 400 }}>
    <Chat />
  </div>
))
