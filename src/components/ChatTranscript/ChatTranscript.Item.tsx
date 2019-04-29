import * as React from 'react'
import LineItem from './ChatTranscript.LineItem'
import Attachment from '../Attachment'
import AttachmentList from '../AttachmentList'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { convertLinksToHTML, newlineToHTML } from '../../utilities/strings'
import compose from '@helpscout/react-utils/dist/compose'

export const ITEM_TYPES = {
  lineItem: 'line_item',
  message: 'message',
  note: 'note',
}

type Author = {
  name?: string
}

type Props = {
  action?: string
  attachments: Array<Object>
  author: Author
  body?: string
  chatId?: number | string
  children?: any
  className?: string
  createdAt?: string
  id?: number | string
  isBodySafe?: boolean
  onAttachmentClick?: () => void
  onDownloadAllAttachmentClick?: () => void
  params?: any
  showDownloadAllAttachments?: boolean
  timestamp?: string
  type?: 'line_item' | 'message' | 'note'
}

// convertLinksToHTML will escape for output as HTML
const enhanceBody = compose(newlineToHTML, convertLinksToHTML)

const Item = (props: Props) => {
  const {
    action,
    attachments,
    author,
    body,
    chatId,
    children,
    className,
    createdAt,
    id,
    isBodySafe,
    onAttachmentClick,
    onDownloadAllAttachmentClick,
    params,
    showDownloadAllAttachments,
    timestamp,
    type,
    ...rest
  } = props

  const maybeLineItem = type === ITEM_TYPES.lineItem
  const maybeHasAuthor = author && author.name
  const maybeNote = type === ITEM_TYPES.note

  const componentClassName = classNames(
    'c-ChatTranscriptItem',
    attachments.length && 'has-attachments',
    type && `is-${type}`,
    className
  )

  if (maybeLineItem) {
    const lineItemProps = {
      body,
      createdAt,
      className: componentClassName,
      isBodySafe,
      timestamp,
      ...rest,
    }
    return <LineItem {...lineItemProps}>{children}</LineItem>
  }
  const contentClassName = classNames(
    'c-ChatTranscriptItem__content',
    type && `is-${type}`
  )

  const authorMarkup = maybeHasAuthor ? (
    <Flexy.Item>
      <Heading
        className="c-ChatTranscriptItem__author"
        lineHeightReset
        size="h5"
      >
        {author.name}
      </Heading>
    </Flexy.Item>
  ) : null

  const privateNoteMarkup = maybeNote ? (
    <Flexy.Item>
      <Text
        className="c-ChatTranscriptItem__privateNote"
        block
        lineHeightReset
        size="12"
      >
        Private Note
      </Text>
    </Flexy.Item>
  ) : null

  const timestampMarkup = createdAt ? (
    <Flexy.Item>
      <Text
        className="c-ChatTranscriptItem__createdAt"
        block
        lineHeightReset
        size="12"
        title={timestamp}
      >
        {createdAt}
      </Text>
    </Flexy.Item>
  ) : null

  const headerMarkup = (
    <div className="c-ChatTranscriptItem__header">
      <Flexy align="bottom" gap="xs" just="left">
        {authorMarkup}
        {privateNoteMarkup}
        {timestampMarkup}
      </Flexy>
    </div>
  )

  // Older transcripts will have a body that was sanitized by Chat API
  // With these items we do not need to escape HTML or convert URLs to links
  const contentHTML = isBodySafe ? body : enhanceBody(body)

  const contentMarkup = contentHTML ? (
    <div
      className={contentClassName}
      dangerouslySetInnerHTML={{
        __html: contentHTML,
      }}
    />
  ) : (
    <div className={contentClassName}>{children}</div>
  )

  const attachmentMarkup = attachments.length ? (
    <AttachmentList
      className="c-ChatTranscriptItem__attachmentList"
      onDownloadAllClick={onDownloadAllAttachmentClick}
      showDownloadAll={showDownloadAllAttachments}
    >
      {attachments.map((attachment, index) => {
        /* istanbul ignore next */
        // Enzyme can't test keys :s
        // TODO: fix typescript complains
        // @ts-ignore
        const key = attachment.id ? attachment.id : `attachment-${index}`

        return (
          <Attachment onClick={onAttachmentClick} key={key} {...attachment} />
        )
      })}
    </AttachmentList>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      <div className="c-ChatTranscriptItem__contentWrapper">
        {headerMarkup}
        {contentMarkup}
        {attachmentMarkup}
      </div>
    </div>
  )
}

Item.defaultProps = {
  attachments: [],
  author: {
    name: 'Name',
  },
  createdAt: '',
  onAttachmentClick: noop,
  onDownloadAllAttachmentClick: noop,
  showDownloadAllAttachments: true,
  type: 'message',
}

Item.displayName = 'ChatTranscript.Item'

Item.LineItem = LineItem

export default Item
