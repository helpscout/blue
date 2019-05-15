import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  color: {
    labelDefault: getColor('text.muted'),
    labelSelected: getColor('text.default'),
  },
  helpTextOffset: '24px',
  labelTextMargin: '10px',
}

export const ChoiceUI = styled('div')`
  ${baseStyles};
`

export const ChoiceLabelUI = styled('label')`
  ${baseStyles};
  cursor: pointer;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;

  &.is-block {
    display: block;
    vertical-align: initial;
  }

  &.is-disabled {
    cursor: not-allowed;
  }

  &.is-stacked {
    color: ${config.color.labelDefault};

    &.is-selected {
      color: ${config.color.labelSelected};
    }
  }
`

export const ChoiceHelpTextUI = styled('div')`
  ${baseStyles};
  margin-left: ${config.helpTextOffset};

  &.is-stacked {
    margin-left: 0;
  }
`

export const ChoiceLabelTextUI = styled('span')`
  ${baseStyles};

  &.is-stacked {
    display: block;
    font-weight: bold;
    margin-top: ${config.labelTextMargin};
  }
`

export default ChoiceUI
