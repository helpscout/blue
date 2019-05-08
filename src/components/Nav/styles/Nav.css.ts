import styled from '../../styled'
import Flexy from '../../Flexy'
import Text from '../../Text'
import { getColor } from '../../../styles/utilities/color'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const config = {
  indicatorTransition: 'opacity 100ms ease',
  padding: '10px',
}

export const NavUI = styled('nav', { pure: false })`
  --BlueConfigGlobalFontSize: 14px;
  ${baseStyles};
  display: flex;
  margin: 0 auto;
`

export const ListUI = styled('ul', { pure: false })`
  ${baseStyles};
  display: flex;
  list-style: none;
  margin: 0 auto;
  padding: 0;
`

export const ItemUI = styled('li', { pure: false })`
  padding: 0;
  transform: translateZ(0);

  &.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .c-NavItemLink {
    color: ${getColor('charcoal.200')};
    display: block;
    text-decoration: none !important;
    padding: 0 ${config.padding};

    &:hover {
      color: ${getColor('charcoal.300')};
    }

    &.is-active {
      color: ${getColor('charcoal.500')};
    }
  }
`

export const ContentUI = styled('div')`
  padding: 20px 7px 20px 5px;
  position: relative;
  text-align: center;
`

export const TitleUI = styled(Text)`
  display: block;
  min-height: 14px;

  ${({ isActive }) =>
    isActive &&
    `
    font-weight: 500;
  `};
`

export const GhostTitleUI = styled(Text)`
  display: block;
  font-weight: 500;
  height: 0;
  visibility: hidden;
`

export const ErrorWrapperUI = styled(Flexy.Item)`
  height: 0;
  position: relative;
  top: -10px;
  width: 20px;
`

export const IndicatorUI = styled('div')`
  background: ${getColor('blue.500')};
  border-radius: 9999px;
  bottom: -1px;
  height: 2px;
  opacity: 0;
  left: 0;
  right: 0;
  position: absolute;
  transition: ${config.indicatorTransition};
  will-change: opacity;

  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1;
  `};
`
