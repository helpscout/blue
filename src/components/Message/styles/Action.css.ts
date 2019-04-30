import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

const css = `
  ${baseStyles}
  padding-bottom: 4px;
  padding-top: 4px;

  a {
    color: ${getColor('charcoal.400')};
  }
`

export default css
