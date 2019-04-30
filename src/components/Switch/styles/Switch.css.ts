import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import styled from '../../styled'

export const config = {
  backgroundColor: {
    default: getColor('grey.500'),
    disabled: getColor('grey.300'),
    hover: getColor('grey.600'),
  },
  backgroundColorChecked: {
    default: getColor('green.500'),
    disabled: getColor('green.300'),
    hover: getColor('green.600'),
  },
  borderRadius: 100,
  color: {
    default: getColor('charcoal.200'),
    disabled: getColor('charcoal.400'),
    checked: 'white',
  },
  fontSize: 12,
  padding: '0 10px',
  toggle: {
    offset: 2,
  },
  size: {
    lg: 28,
    md: 21,
    sm: 16,
  },
  transition: {
    switch: 'all 300ms ease',
    toggle: 'all 200ms ease',
  },
}

export const WrapperUI = styled('div')`
  ${baseStyles} display: inline-block;
`

export const SwitchUI = styled('label')`
  ${baseStyles} cursor: pointer;
  display: block;
  margin: 0;
  position: relative;

  &.is-disabled {
    pointer-events: none;
  }

  &.is-loading {
    pointer-events: none;
  }
`

export const InputUI = styled('input')`
  ${baseStyles} bottom: 0;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: -1;
`

export const BackdropUI = styled('div')`
  background-color: ${config.backgroundColor.default};
  border-radius: ${config.borderRadius}px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) inset;
  box-sizing: border-box;
  color: ${config.color.default};
  cursor: pointer;
  font-size: ${config.fontSize}px;
  padding: ${config.padding};
  pointer-events: none;
  position: relative;
  text-align: right;
  transition: ${config.transition.switch};
  z-index: 1;

  &.is-focused {
    background-color: ${config.backgroundColor.hover};
  }

  &.is-disabled {
    background-color: ${config.backgroundColor.disabled};
    color: ${config.color.disabled};
  }

  &.is-checked {
    background-color: ${config.backgroundColorChecked.default};
    color: ${config.color.checked};
    text-align: left;

    &.is-focused {
      background-color: ${config.backgroundColorChecked.hover};
    }

    &.is-disabled {
      background-color: ${config.backgroundColorChecked.disabled};
      color: ${config.color.disabled};
    }
  }

  ${makeSizeStyles(config)};
`

export const ToggleUI = styled('div')`
  background-color: white;
  border-radius: ${config.borderRadius}px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  content: '';
  left: ${config.toggle.offset}px;
  pointer-events: none;
  position: absolute;
  top: ${config.toggle.offset}px;
  transition: ${config.transition.toggle};

  ${makeToggleSizeStyles(config)} &.is-active {
    width: 60%;
  }

  &.is-checked {
    left: inherit;
    right: ${config.toggle.offset}px;
  }

  &.is-loading {
    animation: SwitchTogglePulse 1000ms linear infinite;
    left: 50%;
    right: inherit;

    ${makeToggleOffsetStyles(config)};
  }

  @keyframes SwitchTogglePulse {
    0% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: scale(0.8);
    }

    50% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: scale(0.6);
    }

    100% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: scale(0.8);
    }
  }
`

export const StateUI = styled('div')`
  border-radius: 100px;
  bottom: 0;
  box-shadow: 0 0 0 2px ${getColor('state.error')};
  display: block;
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`

function getWidth(size: number): number {
  return Math.floor(size * 2)
}

function makeSizeStyles(config: any): string {
  return forEach(
    config.size,
    (size, value) => `
    &.is-${size} {
      height: ${value}px;
      line-height: ${value}px;
      width: ${getWidth(value)}px;
    }
  `
  )
}

function makeToggleSizeStyles(config: any): string {
  return forEach(
    config.size,
    (size, value) => `
    &.is-${size} {
      height: ${value - config.toggle.offset * 2}px;
      width: ${value - config.toggle.offset * 2}px;
    }
  `
  )
}

function makeToggleOffsetStyles(config: any): string {
  return forEach(
    config.size,
    (size, value) => `
    &.is-${size} {
      margin-left: -${value / 2 - config.toggle.offset / 1}px;
    }
  `
  )
}

export default SwitchUI
