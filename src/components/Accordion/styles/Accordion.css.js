// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const AccordionUI = styled('div')`
  ${baseStyles};
  border: 1px solid rgba(193, 203, 212, 0.7);
  border-radius: 4px;

  &.is-seamless {
    border: none;
    border-radius: none;
  }
`

export const BodyUI = styled('div')`
  ${baseStyles};

  padding: 20px 20px;

  &.is-md {
    padding: 16px 20px;
  }

  &.is-sm {
    padding: 12px 20px;
  }

  &.is-xs {
    padding: 8px 20px;
  }

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }
`

export const SectionUI = styled('div')`
  ${baseStyles};

  border-bottom: 1px solid rgba(193, 203, 212, 0.7);

  &.is-seamless,
  &:last-child {
    border-bottom: none;
  }
`

export const TitleUI = styled('div')`
  ${baseStyles};
  cursor: pointer;
  padding: 20px 20px;

  &:hover,
  &:focus,
  &.is-open {
    background-color: #f9fafa;
  }

  &.is-open {
    border-bottom: 1px solid rgba(193, 203, 212, 0.7);

    &.is-seamless {
      border-bottom: none;
    }
  }

  &.is-md {
    padding: 16px 20px;
  }

  &.is-sm {
    padding: 12px 20px;
  }

  &.is-xs {
    padding: 8px 20px;
  }

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }
`
