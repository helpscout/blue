import React from 'react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { BlankSlate } from '../src/index.js'

import { withAktiv, withHsApp } from './utils'

const stories = storiesOf('BlankSlate', module)
stories.addDecorator(
  withKnobs({
    escapeHTML: false,
  })
)
stories.addDecorator(withAktiv)

const message = () =>
  text(
    'message',
    `No results found for "boopable". Please try another search term.`
  )
const title = (title = 'No Customers yet') => text('title', title)
const illoName = (illoName = 'chatListBlankSlate') => text('illoName', illoName)

const htmlMessage = (
  <span>
    No results found for <b>"boopable"</b>. Please try another search term.
  </span>
)

const getKnobsProps = otherKnobs => {
  return {
    lightBackground: boolean('lightBackground', false),
    alignTop: boolean('alignTop', false),
    ...otherKnobs,
  }
}

stories.add('Default', () => {
  const props = { message: message(), title: title('') }
  return <BlankSlate {...getKnobsProps()} {...props} />
})
stories.add('HTML in message', () => {
  const props = {
    title: title(''),
    message: htmlMessage,
  }
  return <BlankSlate {...getKnobsProps()} {...props} />
})

stories.add('Illo', () => {
  const props = {
    title: title(''),
    illoName: illoName(),
    message: htmlMessage,
  }
  return <BlankSlate {...getKnobsProps()} {...props} />
})

stories.add('Heading', () => {
  const props = { title: title(), message: htmlMessage }
  return <BlankSlate {...getKnobsProps()} {...props} />
})

stories.add('Light background', () => {
  const props = {
    title: title(),
    illoName: illoName(),
    lightBackground: boolean('lightBackground', true),
    message: htmlMessage,
  }
  return <BlankSlate {...props} />
})

const storiesHsApp = storiesOf('BlankSlate/HS App', module)
storiesHsApp.addDecorator(
  withKnobs({
    escapeHTML: false,
  })
)
storiesHsApp.addDecorator(withHsApp)

storiesHsApp.add('default', () => {
  const props = { title: title(), illoName: illoName(), message: htmlMessage }
  return <BlankSlate {...getKnobsProps()} {...props} />
})

storiesHsApp.add('Light background', () => {
  const props = {
    title: title(),
    illoName: illoName(),
    lightBackground: boolean('lightBackground', true),
    alignTop: boolean('alignTop', false),
    message: htmlMessage,
  }
  return (
    <div style={{ height: '800px' }}>
      <BlankSlate {...props} />
    </div>
  )
})

storiesHsApp.add('Align top', () => {
  const props = {
    title: title(),
    illoName: illoName(),
    lightBackground: boolean('lightBackground', true),
    alignTop: boolean('alignTop', true),
    message: htmlMessage,
  }

  return (
    <div style={{ height: '800px' }}>
      <BlankSlate {...props} />
    </div>
  )
})
