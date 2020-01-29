import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../Condition'
import ConditionField from '.'
import Flexy from '../Flexy'
import Input from '../Input'
import Select from '../Select'

import { boolean, number, text } from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('ConditionField', module)

stories.addDecorator(jsxDecorator)

const options = [
  {
    label: 'Time on page',
    value: 'time-on-page',
  },
]

stories.add('Default', () => {
  const props = {
    error: boolean('error', false),
    removeTitle: text('removeTitle', 'Remove'),
    tooltipDelay: number('tooltipDelay', 800),
    tooltipDuration: number('tooltipDuration', 60),
  }

  const { error } = props

  return (
    <Condition options={options} value="time-on-page">
      <ConditionField {...props}>
        <ConditionField.Item>
          <ConditionField.Static>Show after</ConditionField.Static>
        </ConditionField.Item>
        <ConditionField.Block>
          <Flexy gap="xs">
            <Flexy.Item>
              <Input
                inputType="number"
                autoComplete="off"
                width={error ? 75 : 55}
                value={5}
                state={error && 'error'}
              />
            </Flexy.Item>
            <Flexy.Block>
              <Select
                options={[
                  {
                    label: 'Seconds',
                    value: 'seconds',
                  },
                  {
                    label: 'Minutes',
                    value: 'minutes',
                  },
                ]}
                width={160}
                value="seconds"
              />
            </Flexy.Block>
          </Flexy>
        </ConditionField.Block>
      </ConditionField>
    </Condition>
  )
})

stories.add('No remove', () => {
  const props = {
    error: boolean('error', false),
    isWithRemove: boolean('isWithRemove', false),
    removeTitle: text('removeTitle', 'Remove'),
    tooltipDelay: number('tooltipDelay', 800),
    tooltipDuration: number('tooltipDuration', 60),
  }

  const { error } = props

  return (
    <Condition options={options} value="time-on-page">
      <ConditionField {...props}>
        <ConditionField.Item>
          <ConditionField.Static>Show after</ConditionField.Static>
        </ConditionField.Item>
        <ConditionField.Block>
          <Flexy gap="xs">
            <Flexy.Item>
              <Input
                inputType="number"
                autoComplete="off"
                width={error ? 75 : 55}
                value={5}
                state={error && 'error'}
              />
            </Flexy.Item>
            <Flexy.Block>
              <Select
                options={[
                  {
                    label: 'Seconds',
                    value: 'seconds',
                  },
                  {
                    label: 'Minutes',
                    value: 'minutes',
                  },
                ]}
                width={160}
                value="seconds"
              />
            </Flexy.Block>
          </Flexy>
        </ConditionField.Block>
      </ConditionField>
    </Condition>
  )
})
