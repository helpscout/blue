import styled from '../../styled'
import forEach from '../../../styles/utilities/forEach'
import { breakpointAll } from '../../../styles/mixins/breakpoints.css.js'

export const config = {
  maxWidth: '1140px',
  gutter: '15px',
  size: {
    md: {
      gutter: '8px',
    },
    sm: {
      gutter: '4px',
    },
    xs: {
      gutter: '2px',
    },
  },
}

export const ContainerUI = styled('div')`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${config.maxWidth};
  padding-left: ${config.gutter};
  padding-right: ${config.gutter};

  &.is-fluid {
    max-width: 100%;
  }

  ${makeResponsiveStyles};
  ${makeSizeStyles};
`

function makeResponsiveStyles(): string {
  return breakpointAll(`
    &.is-responsive {
      max-width: 100%;
    }
  `)
}

function makeSizeStyles(): string {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      padding-left: ${props.gutter};
      padding-right: ${props.gutter};
    }
  `
  )
}
