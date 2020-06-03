import styled from 'styled-components'
import Card from '../Card'
import Button from '../Button'
import Heading from '../Heading'
import { makeFontFamily, setFontSize } from '../../styles/utilities/font'
import { getColor } from '../../styles/utilities/color'
const fontFamily = makeFontFamily('Barlow')

export const MessageCardUI = styled(Card)`
  background-color: white;
  border-color: transparent !important;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 20px 25px;
  width: 300px;
  word-break: break-word;

  &.is-align-right {
    border-bottom-right-radius: 4px;
  }
  &.is-align-left {
    border-bottom-left-radius: 4px;
  }
  &.is-with-box-shadow {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  }
  &.is-mobile {
    width: 100%;

    .is-h4 {
      font-size: 20px !important;
      line-height: 24px !important;
    }

    .is-h5 {
      font-size: 14px !important;
      margin-top: 10px;
    }

    .c-Text {
      font-size: 14px !important;
      line-height: 22px;
      margin-top: 20px;
    }

    .c-Button {
      margin-top: 30px;
      font-size: 16px !important;
      height: 65px !important;
    }
  }
`

export const TitleUI = styled(Heading)`
  ${fontFamily};
  line-height: 22px !important;
  margin-top: 5px;
`

export const SubtitleUI = styled(Heading)`
  ${setFontSize(12)};
  line-height: 18px !important;
  margin-top: 6px;
`

const editorHtmlFontSize = 14

export const BodyUI = styled.div`
  margin-top: ${({ withMargin }) => (withMargin ? '12px' : '0')};
  color: ${getColor('charcoal.700')};
  font-size: ${editorHtmlFontSize}px;
  line-height: 26px;

  p {
    font-size: ${editorHtmlFontSize}px;
    margin: 15px 0;
    padding: 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding: 0;
    margin: 15px 0 0;

    ul.& {
      list-style-type: disc;
    }
    ol.& {
      list-style-type: decimal;
    }

    & > ul {
      list-style-type: circle;
      margin-left: 15px;
      margin-top: 0;

      & > ul {
        list-style-type: square;

        & > ul {
          list-style-type: disc;
        }
      }
    }

    & > ol {
      list-style-type: lower-latin;
      margin-left: 15px;
      margin-top: 0;

      & > ol {
        list-style-type: lower-roman;

        & > ol {
          list-style-type: decimal;
        }
      }
    }

    &:first-child {
      margin-top: 0;
    }
  }

  ul li {
    font-size: ${editorHtmlFontSize}px;
    margin-left: 30px;
    padding-left: 7px;

    @-moz-document url-prefix() {
      & {
        margin-left: 26px;
        padding-left: 12px;
      }
    }
  }

  ol li {
    font-size: ${editorHtmlFontSize}px;
    margin-left: 27px;
    padding-left: 10px;
  }

  blockquote {
    margin: 15px 0 0 15px;
    padding: 0 25px 0 20px;
    border-left: 2px solid ${getColor('grey.500')};
    color: ${getColor('charcoal.400')};

    &:first-child {
      margin-top: 0;
    }

    p {
      font-size: ${editorHtmlFontSize}px;
    }
  }

  code.inline-code {
    display: inline-flex;
    align-items: center;
    color: ${getColor('red.500')};
    caret-color: ${getColor('red.500')};
    padding: 0 7px;
    font-size: 12px;
    position: relative;
    margin: 0 1px;
    background: ${getColor('grey.300')};
    border-radius: 4px;
    font-family: var(--HSDSGlobalFontFamilyMono);
    height: 24px;
    line-height: 24px;
    vertical-align: baseline;
  }

  pre {
    font-family: var(--HSDSGlobalFontFamilyMono);
    margin: 15px 0;
    padding: 15px 25px;
    border: 1px solid ${getColor('grey.500')};
    border-radius: 2px;
    background-color: ${getColor('grey.200')};
    color: ${getColor('charcoal.800')};
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 12px;

    &:first-child {
      margin-top: 8px;
    }

    p {
      font-size: 12px;
      margin: 0;
    }
  }

  a {
    color: ${getColor('link.base')};
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${getColor('link.hover')};
      outline-width: 0;
      text-decoration: underline;
    }

    &:active {
      color: ${getColor('link.active')};
      text-decoration: underline;
      outline-width: 0;
    }
  }

  b,
  strong {
    font-weight: bold;
    color: ${getColor('charcoal.800')};
  }
  i,
  em {
    font-style: italic;
  }
  u {
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }
  s {
    text-decoration: line-through;
  }
`

export const ActionUI = styled('div')`
  margin-bottom: -5px;
  margin-top: 20px;
`

export const ActionButtonUI = styled(Button)`
  ${setFontSize(14)};
  line-height: normal !important;
`
