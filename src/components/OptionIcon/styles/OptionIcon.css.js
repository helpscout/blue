// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor, getThemeBrandProp } from '../../../styles/utilities/color'
import styled from '../../styled'

export const config = {
  backgroundColor: getColor('purple.500'),
  color: 'white',
  size: 44,
}

export const OptionIconUI = styled('div')`
  ${baseStyles} align-items: center;
  border-radius: 99999px;
  display: flex;
  height: ${config.size}px;
  justify-content: center;
  width: ${config.size}px;

  ${props => renderThemeStyles(props)};
`

function renderThemeStyles(props) {
  const backgroundColor = getThemeBrandProp(
    props,
    'brandColor',
    config.backgroundColor
  )
  const color = getThemeBrandProp(props, 'textColor', config.color)

  return `
    background-color: ${backgroundColor};
    color: ${color};
  `
}

export default OptionIconUI
