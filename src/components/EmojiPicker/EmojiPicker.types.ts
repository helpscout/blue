import { DropdownProps } from '../Dropdown/V2/Dropdown.types'

export interface EmojiProps {
  colons: string
  hoverBackgroundColor: string
  name: string
  symbol: string
  unified: string
  value: string
}

export interface EmojiPickerProps extends DropdownProps {
  className?: string
  emojiSet?: Array<EmojiProps>
  size?: string
}

export interface EmojiPickerMenuProps {
  className?: string
  items: Array<EmojiProps>
  renderItem?: any
  renderMenu?: any
  size: string
}

export interface EmojiPickerItemProps {
  className: any
  hoverBackgroundColor: string
  name: string
  renderItem?: any
  size: string
  symbol?: string
}
