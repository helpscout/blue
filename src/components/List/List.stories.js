import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { List, Text } from '../index'

export default {
  component: List,
  title: 'Components/List',
}

const listItems = [
  {
    title: 'Zoolander',
    year: 2001,
  },
  {
    title: 'Old School',
    year: 2003,
  },
  {
    title: 'Elf',
    year: 2003,
  },
  {
    title: 'Anchorman: The Legend of Ron Burgandy',
    year: 2004,
  },
  {
    title: 'Step Brothers',
    year: 2008,
  },
  {
    title: 'The Other Guys',
    year: 2010,
  },
]

const listItemsMarkup = listItems.map(item => {
  return (
    <List.Item key={item.title}>
      <Text>{item.title}</Text>
      <br />
    </List.Item>
  )
})

export const Default = () => {
  const props = {
    border: select(
      'border',
      {
        dot: 'dot',
        line: 'line',
        none: null,
      },
      null
    ),
    type: select(
      'type',
      {
        bullet: 'bullet',
        inline: 'inline',
        number: 'number',
        none: null,
      },
      null
    ),
    size: select(
      'size',
      {
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      null
    ),
  }

  return <List {...props}>{listItemsMarkup}</List>
}
