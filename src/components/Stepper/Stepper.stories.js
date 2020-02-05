import React from 'react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Stepper from '.'

export default {
  component: Stepper,
  title: 'Components/Stepper',
}

export const Default = () => {
  const props = {
    currentIndex: number('currentIndex', 0),
    isClickable: boolean('isClickable', false),
    onChange: action('onChange'),
    onStepClick: action('onStepClick'),
    onComplete: action('onComplete'),
    steps: [
      {
        title: 'Content',
      },
      {
        title: 'Trigger',
      },
      {
        title: 'Review',
      },
    ],
  }

  return <Stepper {...props} />
}
