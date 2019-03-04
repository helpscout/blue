import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Link, Message, PreviewCard } from '../../src/index.js'

const stories = storiesOf('Message', module)

stories.add('default', () => (
  <div>
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Question read timestamp="9:41am">
        How's it <a>goin</a>'?
      </Message.Question>
    </Message>
    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy became upset. <a href="#">Find out what happened</a>
      </Message.Action>
    </Message>
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        :sob:
        <br />
        omgomgomg
        {1}
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        <strong>*Frantically running through North pole*</strong>
      </Message.Chat>
    </Message>

    <Message from>
      <Message.Action read timestamp="9:41am">
        Puffin joined.
      </Message.Action>
    </Message>
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat read timestamp="9:41am">
        Hey Buddy!
      </Message.Chat>
      <Message.Media
        imageUrl="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
        caption="image.jpg"
        timestamp="9:41am"
        read
      />
    </Message>

    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        <strong>*NOT NOW ARCTIC PUFFIN!*</strong>
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
          https://en.wikipedia.org/wiki/Elf_(film)
        </Link>
      </Message.Chat>
      <Message.Content>
        <PreviewCard
          href="https://en.wikipedia.org/wiki/Elf_(film)"
          title="Wikipedia: Elf (film)"
          target="_blank"
        >
          Elf is a 2003 American Christmas fantasy comedy film directed by Jon
          Favreau and written by David Berenbaum. It stars Will Ferrell, James
          Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and
          Bob Newhart...
        </PreviewCard>
      </Message.Content>
      <Message.Chat read timestamp="9:41am">
        Just read that!
      </Message.Chat>
    </Message>

    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat read timestamp="9:41am">
        :sob:
      </Message.Chat>
    </Message>

    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy left the North Pole.
      </Message.Action>
    </Message>
    <Message to>
      <Message.Action read timestamp="9:41am">
        Buddy came back to the North Pole.
      </Message.Action>
    </Message>
    <Message to>
      <Message.Action read timestamp="9:41am">
        Marked as important.
      </Message.Action>
    </Message>

    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat
        isNote
        read
        timestamp="9:41am"
        body="Note: <em>SAAAAAAANTAAAAAAAA!</em> www.helpscout.com"
      />
    </Message>

    <Message to>
      <Message.Action read timestamp="9:41am">
        Marked as super important.
      </Message.Action>
    </Message>

    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat typing />
    </Message>
  </div>
))
