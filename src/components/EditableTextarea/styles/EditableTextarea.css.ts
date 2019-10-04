import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { COLOURS, SIZES } from '../../EditableField/EditableField.utils'
import { FONT_FAMILY } from '../../../styles/configs/constants'
import { isFirefox } from '../../../utilities/browser'
import { getColor } from '../../../styles/utilities/color'

const { field, focusIndicator } = SIZES

export const ComponentUI = styled('div')`
  ${baseStyles};
  width: 100%;
  max-width: 100%;
  margin-bottom: 40px;
`

export const EditableTextareaUI = styled('div')`
  box-sizing: border-box;
  position: relative;

  // we don't want a border on the bottom when the field
  // is active, it should just have the blue bar
  // border-bottom: 1px dashed ${COLOURS.mask.border};
  border-bottom: 1px solid transparent;

  &:after {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: ${focusIndicator.active};
    background-color: ${COLOURS.focusIndicator.active};
    transform-origin: bottom left;
    transform: scaleX(1);
    transition: transform 0.3s ease;
    z-index: 3;
    will-change: transform;
  }

  &.is-readonly:after {
    transform: scaleX(0);
  }

  &.is-readonly {
    border-bottom: 1px dashed ${COLOURS.invisible};

    &:not(.with-placeholder):hover {
      border-bottom: 1px dashed ${COLOURS.mask.border};
    }

    textarea {
      cursor: pointer;

      &::placeholder {
        color: ${COLOURS.mask.placeholder.regular};
      }
    }
  }

  &.with-placeholder.is-readonly {
    .field {
      border-bottom: 1px dashed ${COLOURS.mask.border};

      &:hover {
        border-bottom: 1px dashed ${COLOURS.mask.placeholder.border.hover};
      }
    }
  }

  &.is-readonly.is-clamped:before {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 50px;
    ${({ overflowCueColor }) =>
      `background: -moz-linear-gradient(
        top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      );
      background: -webkit-linear-gradient(
        top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      );
      background: linear-gradient(
        to top,
        ${overflowCueColor} 0%,
        rgba(255, 255, 255, 0) 100%
      )`};
    left: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 3;
  }

  .field {
    &.hide {
      display: none;
    }
    &.inline {
      display: inline-block;
      height: 20px;
      width: auto;
      padding: 0;
      color: ${getColor('charcoal.300')} !important;
    }
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
    border: 0;
    margin: 0;
    ${
      /* 
      I have no idea why Chrome and safari are adding 3px to the height of the parent of the textarea,
      so I'm adding those 3px to firefox for parity  ¯\_(ツ)_/¯
    */
      isFirefox() && 'margin-bottom: 3px;'
    }
    padding: 0 10px 0 0;
    color: ${COLOURS.input.regular};
    font-family: ${FONT_FAMILY};
    font-size: ${field.font.medium};
    line-height: 20px;
    outline: none;
    resize: none;
    overflow: hidden;
    box-shadow: none;
    scrollbar-width: thin;
  }
  textarea {
    &:hover,
    &:focus {
      overflow-y: auto;
      overscroll-behavior-y: contain;
    }

    &::placeholder {
      color: ${COLOURS.mask.placeholder.regular};
    }

    ::-webkit-scrollbar {
      width: 7px;
      background: rgba(0, 0, 0, 0);
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.25);
      border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 100px;
    }
  }
`