import React from 'react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import EmojiPicker from '.'

export default {
  component: EmojiPicker,
  title: 'Components/EmojiPicker',
}
export const Default = () => {
  const props = {
    shouldRefocusOnClose() {
      return false
    },
    onSelect: action('Emoji Selected'),
    size: select(
      'Emoji Size',
      { default: 'default', sm: 'sm', lg: 'lg' },
      'default'
    ),
  }

  return <EmojiPicker {...props} />
}
