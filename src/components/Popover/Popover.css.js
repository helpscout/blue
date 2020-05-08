import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { getShadow } from '../../styles/utilities/shadow'

import { ArrowUI, TooltipUI } from '../Tooltip/Tooltip.css'

import Heading from '../Heading'

export const config = {
  borderColor: getColor('grey.600'),
  boxShadow: getShadow(100),
  padding: '15px',
  background: 'white',
}

export const ArrowPopoverUI = styled(ArrowUI)`
  &:before {
    background: ${config.background};
    border: 1px solid ${config.borderColor};
  }

  /* ghost */
  &:after {
    content: '';
    background: ${config.background};
    position: absolute;
    transform: rotate(45deg);
    height: calc(${({ size }) => size}px - 4px);
    width: calc(${({ size }) => size}px - 4px);
    margin: 2px;
    border-color: transparent;
    box-shadow: none;
    left: 0;
  }
`

export const PopoverUI = styled(TooltipUI)`
  background: ${config.background};
  border: 1px solid ${config.borderColor};
  box-shadow: ${config.boxShadow};
  color: inherit;
  font-size: inherit;
  padding: ${config.padding};

  &[data-placement^='top'] ${ArrowPopoverUI} {
    &:after {
      bottom: 1px;
    }
  }

  &[data-placement^='bottom'] ${ArrowPopoverUI} {
    &:after {
      top: 1px;
    }
  }

  &[data-placement^='left'] ${ArrowPopoverUI} {
    &:after {
      left: -1px;
    }
  }

  &[data-placement^='right'] ${ArrowPopoverUI} {
    &:after {
      left: 1px;
    }
  }
`

export const HeaderUI = styled('div')`
  border-bottom: 1px solid ${config.borderColor};
  margin-bottom: ${config.padding};
  margin-left: calc(${config.padding} * -1);
  margin-right: calc(${config.padding} * -1);
  margin-top: calc(${config.padding} * -1);
  padding: 10px ${config.padding};
`

export const HeadingUI = styled(Heading)`
  color: ${getColor('charcoal.300')};
`
HeadingUI.defaultProps = {
  size: 'h4',
  weight: 400,
}
