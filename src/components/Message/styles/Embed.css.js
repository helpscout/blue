// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { BEM } from '../../../utilities/classNames'
import { getColor } from '../../../styles/utilities/color'
import { noteBoxShadow } from '../../../styles/mixins/noteStyles.css.js'

const config = {
  embedBorderRadius: '3px',
  embedWidth: '9999px',
  embedMaxWidth: '300px',
}

const bem = BEM('.c-MessageEmbed')

export const css = `
  ${baseStyles}

  ${bem.element('html')} {
    border-radius: ${config.embedBorderRadius};
    max-width: 100%;
    overflow: hidden;
    width: ${config.embedWidth};
  }

  iframe {
    opacity: 1;
    transition: opacity .5s ease-in;
  }

  &.is-loading iframe {
    opacity: 0;
  }

  ${bem.element('bubble')}.c-MessageBubble {
    background-color: white;
    border: none;
    box-shadow:
      0px 1px 3px 0px rgba(0,0,0,0.1),
      0px 0px 0px 1px rgba(193,203,212,.7) inset,
      0px -1px 0px 0px ${getColor('grey.600')} inset;
    color: ${getColor('charcoal.200')};
    display: inline-block;
    max-width: ${config.embedMaxWidth};
    overflow: hidden;
    padding: 3px;
    width: 100%;

    &.is-note {
      ${noteBoxShadow()}
      background-color: ${getColor('yellow.200')};
      color: ${getColor('yellow.800')};
    }
  }

  ${bem.element('loading')}.c-LoadingDots {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default css
