import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { config as popoverConfig } from '../Popover/Popover.css'

export const config = {
  background: getColor('charcoal.700'),
  text: 'white',
}

export const PopperUI = styled('span')`
  background-color: ${config.background};
  border-radius: 3px;
  color: ${config.text};
  display: block;
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;

  &.c-PopoverContent {
    background: white;
    border: 1px solid ${popoverConfig.borderColor};
    box-shadow: ${popoverConfig.boxShadow};
    color: inherit;
    font-size: inherit;
    padding: ${popoverConfig.padding};
  }
`