import { propConnect } from '../PropProvider'
import ChatInbox from './ChatInbox'

ChatInbox.Content = propConnect('ChatInboxContent')(ChatInbox.Content)
ChatInbox.Header = propConnect('ChatInboxHeader')(ChatInbox.Header)

export default propConnect('ChatInbox')(ChatInbox)
