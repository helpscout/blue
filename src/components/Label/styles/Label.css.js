import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.css.js'

export const LabelUI = styled('label')`
  ${baseStyles} display: inline-block;
  margin-bottom: 4px;

  ${makeStateColorStyles()} &.is-marginless {
    margin-bottom: 0;
  }
`

export default LabelUI
