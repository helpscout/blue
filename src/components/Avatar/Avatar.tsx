import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { StatusDotStatus } from '../StatusDot/StatusDot.types'
import { AvatarShape, AvatarSize } from './Avatar.types'
import StatusDot from '../StatusDot'
import Icon from '../Icon'
import { IconSize } from '../Icon/Icon.types'
import { getEasingTiming } from '../../utilities/easing'
import { classNames } from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import AvatarCrop from './Avatar.Crop'
import AvatarImage from './Avatar.Image'
import {
  AvatarUI,
  CropBorderUI,
  OuterBorderUI,
  StatusUI,
  TitleUI,
  ActionUI,
  AvatarButtonUI,
  FocusUI,
} from './styles/Avatar.css'
import {
  COMPONENT_KEY,
  IMAGE_STATES,
  hasImage,
  isImageLoaded,
  getImageUrl,
} from './Avatar.utils'

export interface Props {
  animationDuration: number
  animationEasing: string
  actionable?: boolean
  actionIcon?: string
  actionIconSize?: IconSize
  active?: boolean
  borderColor?: string
  className?: string
  count?: number | string
  fallbackImage?: string
  image?: string
  initials?: string
  light: boolean
  name: string
  onLoad?: () => void
  onError?: () => void
  onActionClick?: () => void
  outerBorderColor?: string
  showStatusBorderColor: boolean
  shape: AvatarShape
  size: AvatarSize
  statusIcon?: string
  status?: StatusDotStatus
  style: any
  withShadow: boolean
}

export interface State {
  imageLoaded: string
}

export class Avatar extends React.PureComponent<Props, State> {
  static defaultProps = {
    actionable: false,
    actionIcon: 'trash',
    actionIconSize: '24',
    active: false,
    animationDuration: 160,
    animationEasing: 'ease',
    borderColor: 'transparent',
    fallbackImage: null,
    light: false,
    name: '',
    outerBorderColor: 'transparent',
    showStatusBorderColor: false,
    size: 'md',
    shape: 'circle',
    style: {},
    withShadow: false,
  }

  state = {
    // Assume image is loading so that we only re-render on error
    imageLoaded: IMAGE_STATES.loading,
  }

  onImageLoadedError = () => {
    const { imageLoaded } = this.state

    const isLoading = imageLoaded === IMAGE_STATES.loading

    const newImageLoaded =
      this.props.fallbackImage && isLoading
        ? IMAGE_STATES.fallbackLoading
        : IMAGE_STATES.failed

    this.setState({
      imageLoaded: newImageLoaded,
    })
    this.props.onError && this.props.onError()
  }

  onImageLoadedSuccess = () => {
    const { imageLoaded } = this.state
    const isFallbackLoading = imageLoaded === IMAGE_STATES.fallbackLoading
    this.setState({
      imageLoaded: isFallbackLoading
        ? IMAGE_STATES.fallbackLoaded
        : IMAGE_STATES.loaded,
    })
    this.props.onLoad && this.props.onLoad()
  }

  getShapeClassNames = (): string => {
    const { shape, size } = this.props

    return classNames(shape && `is-${shape}`, size && `is-${size}`)
  }

  renderAction() {
    const { actionable, actionIcon, actionIconSize } = this.props

    if (!actionable) {
      return null
    }

    const actionClassName = classNames(
      'c-Avatar__action',
      this.getShapeClassNames()
    )

    return (
      <ActionUI data-cy="Avatar.Action" className={actionClassName}>
        <Icon name={actionIcon} size={actionIconSize} />
      </ActionUI>
    )
  }

  renderCrop = () => {
    const { animationDuration, animationEasing, name, withShadow } = this.props

    const shapeClassnames = this.getShapeClassNames()

    const _hasImage = hasImage(this.props, this.state)
    const _isImageLoaded = isImageLoaded(this.props, this.state)
    const _imageUrl = getImageUrl(this.props, this.state)

    return (
      <AvatarCrop
        animationDuration={animationDuration}
        animationEasing={animationEasing}
        className={shapeClassnames}
        hasImage={_hasImage}
        isImageLoaded={_isImageLoaded}
        withShadow={withShadow}
      >
        <AvatarImage
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          className={shapeClassnames}
          hasImage={_hasImage}
          image={_imageUrl}
          isImageLoaded={_isImageLoaded}
          name={name}
          title={this.getTitleMarkup()}
          onError={this.onImageLoadedError}
          onLoad={this.onImageLoadedSuccess}
        />
        {this.renderAction()}
      </AvatarCrop>
    )
  }

  renderStatus = () => {
    const {
      borderColor,
      showStatusBorderColor,
      size,
      statusIcon,
      status,
    } = this.props

    const componentClassName = classNames(
      'c-Avatar__status',
      this.getShapeClassNames(),
      statusIcon && 'is-withStatusIcon',
      showStatusBorderColor && 'is-withBorder'
    )

    return (
      status && (
        <StatusUI className={componentClassName}>
          <StatusDot
            icon={statusIcon}
            outerBorderColor={showStatusBorderColor ? borderColor : undefined}
            size={size === 'lg' ? 'md' : 'sm'}
            status={status}
          />
        </StatusUI>
      )
    )
  }

  getText = () => {
    const { count, initials, name } = this.props

    return count || initials || nameToInitials(name)
  }

  getTitleMarkup = () => {
    const { light } = this.props

    const componentClassName = classNames(
      'c-Avatar__title',
      light && 'is-light'
    )
    const text = this.getText()

    return <TitleUI className={componentClassName}>{text}</TitleUI>
  }

  renderCropBorder = () => {
    const { borderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__cropBorder',
      shape && `is-${shape}`
    )

    return (
      <CropBorderUI className={componentClassName} borderColor={borderColor} />
    )
  }

  renderOuterBorder = () => {
    const { outerBorderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__outerBorder',
      shape && `is-${shape}`
    )

    return (
      <OuterBorderUI
        className={componentClassName}
        borderColor={outerBorderColor}
      />
    )
  }

  renderFocusBorder = () => {
    const { shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__focusBorder',
      shape && `is-${shape}`
    )

    return (
      <FocusUI data-cy="Avatar.FocusBorder" className={componentClassName} />
    )
  }

  getStyles() {
    const { animationDuration, animationEasing, style } = this.props

    return {
      ...style,
      transition: `width ${animationDuration}ms ${getEasingTiming(
        animationEasing
      )},
      height ${animationDuration}ms ${getEasingTiming(animationEasing)}`,
    }
  }

  render() {
    const {
      actionable,
      active,
      borderColor,
      className,
      count,
      image,
      name,
      light,
      initials,
      onLoad,
      outerBorderColor,
      showStatusBorderColor,
      size,
      shape,
      status,
      statusIcon,
      withShadow,
      fallbackImage,
      onActionClick,
      ...rest
    } = this.props

    const _hasImage = hasImage(this.props, this.state)

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      _hasImage && 'has-image',
      statusIcon && 'has-statusIcon',
      light && 'is-light',
      active && 'is-active',
      outerBorderColor && 'has-outerBorderColor',
      status && `is-${status}`,
      actionable && `has-action`,
      this.getShapeClassNames(),
      className
    )

    const Component = actionable ? AvatarButtonUI : AvatarUI

    const extraProps = actionable ? { onClick: onActionClick } : {}

    return (
      <Component
        {...getValidProps(rest)}
        data-cy="Avatar"
        className={componentClassName}
        style={this.getStyles()}
        title={name}
        {...extraProps}
      >
        {this.renderCrop()}
        {this.renderStatus()}
        {this.renderCropBorder()}
        {this.renderOuterBorder()}
        {actionable && this.renderFocusBorder()}
      </Component>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Avatar)

export default PropConnectedComponent
