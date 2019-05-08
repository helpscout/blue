import styled from '../../styled/index'
import Button from '../../Button/index'
import { config as buttonConfig } from '../../Button/styles/Button.css'
import forEach from '../../../styles/utilities/forEach'

export const config = {
  size: buttonConfig.size,
  transition: `background-color 120ms ease`,
}

export const IconButtonUI = styled(Button)`
  transition: ${config.transition};

  &.is-borderless,
  &.is-borderless:hover {
    border-color: transparent;
  }

  ${makeButtonSizeStyles};
  ${makeButtonHoverStyles};

  .c-Icon.withCaret {
    margin-left: -3px;
  }
`

function makeButtonSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      height: ${props.height}px;
      min-width: ${props.height}px;
      padding-left: 0.2em;
      padding-right: 0.2em;
    }
  `
  )
}

function makeButtonHoverStyles() {
  return `
    &.is-kind-default,
    &.is-kind-secondary,
    &.is-kind-secondaryAlt,
    &.is-kind-link {
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
      &:active {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  `
}
