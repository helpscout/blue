// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import Animate from '../Animate'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { AvatarStackUI, ItemUI } from './styles/AvatarStack.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  avatarsClassName: string,
  borderColor?: string,
  children?: any,
  className?: string,
  max: number,
  outerBorderColor?: string,
  shape: AvatarShape,
  showStatusBorderColor: boolean,
  size: AvatarSize,
}

class AvatarStack extends Component<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    animationStagger: 0,
    borderColor: 'white',
    max: 5,
    shape: 'circle',
    showStatusBorderColor: true,
    size: 'md',
  }

  getAvatars = () => {
    return React.Children.toArray(this.props.children).filter(child =>
      isComponentNamed(child, AVATAR_KEY)
    )
  }

  getAvatarList = () => {
    const { max } = this.props

    const avatars = this.getAvatars()
    const totalAvatarCount = avatars.length

    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars

    return avatarList
  }

  getAvatarMarkup = () => {
    const {
      animationEasing,
      animationSequence,
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
    } = this.props

    const avatarList = this.getAvatarList()

    const avatarMarkup = avatarList.map((avatar, index) => {
      const zIndex = avatarList.length - index + 1
      const key = avatar.id || `avatar-${index}`

      const composedAvatar = React.cloneElement(avatar, {
        borderColor,
        className: classNames(avatar.props.className, avatarsClassName),
        outerBorderColor,
        shape,
        showStatusBorderColor,
        size,
      })

      return (
        <Animate
          key={key}
          easing={animationEasing}
          sequence={animationSequence}
          style={{ ...avatar.style, zIndex }}
        >
          <ItemUI className="c-AvatarStack__item">{composedAvatar}</ItemUI>
        </Animate>
      )
    })

    return avatarMarkup
  }

  getAdditionalAvatarMarkup = () => {
    const {
      animationEasing,
      animationSequence,
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
    } = this.props

    const avatars = this.getAvatars()
    const avatarList = this.getAvatarList()
    const totalAvatarCount = avatars.length
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    return (
      additionalAvatarCount && (
        <Animate
          key="AvatarGrid__additionalAvatarMarkup"
          easing={animationEasing}
          sequence={animationSequence}
        >
          <ItemUI className="c-AvatarStack__item is-additional">
            <Avatar
              borderColor={borderColor}
              className={avatarsClassName}
              count={`+${additionalAvatarCount}`}
              name={`+${additionalAvatarCount}`}
              outerBorderColor={outerBorderColor}
              shape={shape}
              showStatusBorderColor={showStatusBorderColor}
              size={size}
            />
          </ItemUI>
        </Animate>
      )
    )
  }

  render() {
    const {
      animationEasing,
      animationSequence,
      animationStagger,
      avatarsClassName,
      borderColor,
      children,
      className,
      max,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames('c-AvatarStack', className)

    return (
      <AvatarStackUI
        {...rest}
        className={componentClassName}
        stagger
        staggerDelay={animationStagger}
      >
        <div className="c-AvatarStack__content">
          {this.getAvatarMarkup()}
          {this.getAdditionalAvatarMarkup()}
        </div>
      </AvatarStackUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarStack)

export default AvatarStack
