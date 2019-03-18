import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { SectionUI, SectionHeadingUI } from './SideNavigation.css'
import SideNavigation from './'

export interface Props {
  className?: string
  main?: boolean
  title?: string
  withPadding?: boolean
}

export class Section extends React.PureComponent<Props> {
  static defaultProps = {
    main: false,
    withPadding: false,
  }

  render() {
    const {
      children,
      className,
      title,
      main,
      withPadding,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Section',
      withPadding ? 'is-with-padding' : '',
      className
    )

    return (
      <SectionUI {...getValidProps(rest)} className={componentClassName}>
        {title && (
          <SideNavigation.FadeInOut>
            <SectionHeadingUI size="small">{title}</SectionHeadingUI>
          </SideNavigation.FadeInOut>
        )}
        {children}
      </SectionUI>
    )
  }
}

export default Section
