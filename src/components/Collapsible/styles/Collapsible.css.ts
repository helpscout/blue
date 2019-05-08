import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const CollapsibleUI = styled('div')`
  ${baseStyles};
  overflow: hidden;
  transition-property: height;
  will-change: height;
`
