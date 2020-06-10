import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Section from './Accordion.Section'
import Title from './Accordion.Title'
import { renderChildrenSafely } from '../../utilities/component'

// Higher-order wrapper to render an enhanced Accordion.Section and Accordion.Title
export const Link = props => {
  const { badge, children, href, status, title, to, ...rest } = props

  const isLink = !!(to || href)
  const isOpen = false

  const sectionProps = {
    ...rest,
    children,
    isOpen,
    isLink,
    status,
    title,
  }

  const titleProps = {
    badge,
    href,
    isOpen,
    status,
    title,
    to,
  }

  return (
    <Section {...getValidProps(sectionProps)}>
      <Title {...titleProps}>{renderChildrenSafely(children)}</Title>
    </Section>
  )
}

Link.displayName = 'AccordionLink'
Link.defaultProps = {
  'data-cy': Link.displayName,
}

export default Link
