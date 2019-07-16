import styled from '../../styled/index'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const EditableFieldInputUI = styled('div')`
  ${baseStyles};
  position: relative;
  height: 25px;
  margin-bottom: 2px;
  width: ${({ dynamicFieldWidth, renderAsBlock }) =>
    renderAsBlock ? 'auto' : `${dynamicFieldWidth}`};
  transition: width 0.2s ease-in-out;

  &:hover .EditableField__actions {
    opacity: 1;
    cursor: pointer;
  }

  &.is-active:hover .EditableField__actions {
    display: none;
    cursor: initial;
  }

  &:hover .with-placeholder {
    border-bottom: 1px dashed ${getColor('blue.500')};
  }

  .is-disabled &:hover .with-placeholder {
    border-bottom: 1px solid transparent;
  }
`

export const InteractiveContentUI = styled('div')`
  display: flex;
  height: 26px;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-bottom: 1px solid transparent;

  &:hover {
    cursor: pointer;
    border-bottom: 1px dashed #93a1b0;
  }

  .is-disabled &:hover {
    cursor: initial;
    border-bottom: 1px solid transparent;
  }

  .is-active & {
    pointer-events: none;
    z-index: 2;
    border-bottom-color: transparent !important;
  }
`

export const InputWrapperUI = styled('div')`
  position: relative;
  height: 25px;
  width: 100%;

  .has-options & {
    width: calc(100% - 70px);
  }

  .is-empty & {
    width: 100%;
  }
`

export const OptionsWrapperUI = styled('div')`
  position: relative;
  width: 60px;
  height: 25px;
  margin-right: 20px;
  font-size: 14px;
  line-height: 25px;
  pointer-events: auto;

  .is-disabled & .EditableField__Dropdown:hover {
    cursor: initial;
  }

  .is-empty & {
    width: 0;
    margin-right: 0;
  }

  .is-active.is-empty & {
    width: 60px;
    margin-right: 20px;
  }
`

export const TriggerUI = styled('div')`
  position: relative;
  width: 100%;
`

export const OptionsDropdownUI = styled('div')`
  width: 70px;
  margin-bottom: 5px;
  background: white;
  font-size: 14px;
  line-height: 25px;
  color: transparent;

  .is-active & {
    color: black;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      height: 1px;
      background-color: #c6d0d8;
    }
  }

  .is-active .c-DropdownV2Trigger:focus & {
    outline: none;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      background-color: ${getColor('blue.500')};
      height: 2px;
    }
  }

  &:focus {
    & + .EditableField__focusIndicator {
      transform: scaleX(1);
    }
  }

  & .c-Icon {
    position: absolute;
    right: -5px;
    top: 5px;
  }

  & .c-Truncate {
    width: 60px;
  }
`

export const InputUI = styled('input')`
  width: 100%;
  height: 25px;
  padding: 0;
  border: none;
  color: transparent;
  font-size: 14px;
  background: white;
  pointer-events: auto;

  &::placeholder {
    color: transparent;
  }

  .is-active &:focus {
    outline: none;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      background-color: ${getColor('blue.500')} !important;
      height: 2px;
    }
  }

  .is-active & {
    outline: none;
    color: ${getColor('charcoal.600')};
    z-index: 2;
    cursor: initial;

    & + .EditableField__focusIndicator {
      transform: scaleX(1);
      height: 1px;
      background-color: #c6d0d8;
    }

    &::placeholder {
      color: #b7c2cc;
    }
  }

  .is-empty & {
    cursor: pointer;
  }

  .is-disabled & {
    cursor: initial;
  }

  .is-empty &:focus {
    cursor: initial;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const StaticContentUI = styled('div')`
  position: relative;
  display: inline-block;
  width: ${({ staticContentWidth, renderAsBlock }) =>
    renderAsBlock ? '100%' : `${staticContentWidth}px`};
  max-width: 100%;
  height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;

  .is-active & {
    z-index: 1;
  }
`

export const StaticOptionUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  width: 70px;
  height: 26px;
  margin-right: 10px;
  color: ${getColor('charcoal.600')};
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid transparent;

  .is-empty & {
    display: none;
  }

  .is-active & {
    z-index: 1;
    display: inline-block;
  }

  & .is-placeholder {
    color: ${getColor('charcoal.400')};
  }

  .is-disabled & {
    color: ${getColor('charcoal.200')};
  }

  &:focus {
    outline: none;
    border-bottom: 1px dashed #93a1b0;
  }
`

export const StaticValueUI = styled('span')`
  display: inline-block;
  vertical-align: bottom;
  height: 26px;
  width: 100%;
  max-width: 100%;
  color: ${getColor('charcoal.600')};
  font-size: 14px;
  line-height: 25px;
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
  border-bottom: 1px solid transparent;

  .has-options & {
    width: calc(100% - 80px);
  }

  .has-options.is-empty & {
    width: 100%;
  }

  .is-active & {
    z-index: 1;
    border-bottom: none !important;
  }

  &.is-emphasized {
    font-weight: 500;
  }

  &.with-placeholder {
    border-bottom: 1px dashed #93a1b0;
  }

  & .is-placeholder {
    color: ${getColor('charcoal.400')};
  }

  .is-disabled &.with-placeholder {
    border-bottom: 1px solid transparent;
  }

  .is-disabled & {
    color: ${getColor('charcoal.300')};
  }

  .is-disabled & .is-placeholder {
    color: ${getColor('charcoal.200')};
  }

  &:focus {
    outline: 1px dashed rgba(197, 208, 217, 0.5);
  }
`

export const FocusIndicatorUI = styled('span')`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${getColor('blue.500')};
  transform-origin: bottom left;
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  z-index: 3;
`

export const FieldActionsUI = styled('div')`
  ${({ numberOfActions }) => `width: ${numberOfActions * 25}px;`}
  height: 20px;
  position: absolute;
  top: 1px;
  left: 100%;
  left: ${({ renderAsBlock, numberOfActions }) =>
    renderAsBlock ? `calc(100% - ${numberOfActions * 25}px)` : '100%'};
  z-index: 4;
  opacity: 0;
  text-align: right;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

export const FieldButtonUI = styled('button')`
  display: inline-block;
  vertical-align: middle;
  height: 25px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: slategray;
  font-size: 12px;
  text-align: center;

  &:hover,
  &:focus {
    cursor: pointer;
    color: #3c5263;
  }

  &:focus {
    outline: none;
  }

  &.action-delete {
    &:focus,
    &:hover {
      color: ${getColor('red.500')};
    }
  }

  .c-Icon {
    margin: 0 auto;
  }
`
