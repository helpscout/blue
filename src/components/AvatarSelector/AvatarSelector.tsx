import * as React from 'react'
import {
  AvatarSelectorUI,
  AvatarSelectorWrapperUI,
  AvatarUI,
  IconAssignUI,
  IconCaretUI,
} from './styles/AvatarSelector.css.js'

export interface Props {
  image: string
  isOpen: boolean
  name: string
}

export default class AvatorSelector extends React.PureComponent<Props> {
  static default = {
    image: '',
    isOpen: false,
  }

  renderAvatar() {
    const { image, name } = this.props
    return <AvatarUI borderColor="#fff" size="sm" image={image} name={name} />
  }

  renderAssign() {
    return <IconAssignUI name="assigned" shade="faint" />
  }

  render() {
    const { image, isOpen } = this.props
    return (
      <AvatarSelectorWrapperUI className="c-AvatarSelector" tabIndex="1">
        {image || name ? this.renderAvatar() : this.renderAssign()}
        <AvatarSelectorUI>
          <IconCaretUI
            shade="faint"
            size="14"
            name={isOpen ? 'caret-up' : 'caret-down'}
          />
        </AvatarSelectorUI>
      </AvatarSelectorWrapperUI>
    )
  }
}