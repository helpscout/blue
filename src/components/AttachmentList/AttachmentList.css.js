import styled from 'styled-components'

export const AttachmentListUI = styled.div`
  .c-AttachmentWrapper {
    &:hover {
      .c-Attachment__closeButton {
        display: block;
      }
    }
    &:last-child {
      padding-right: 10px;
    }
  }

  &.withOverflow.is-theme-preview {
    .c-AttachmentWrapper {
      padding-top: 10px;
    }
  }
`
