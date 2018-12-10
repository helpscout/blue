import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import Artboard, { GuideContainer, Guide } from '@helpscout/artboard'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import {
  ArticleCard,
  Flexy,
  Text,
  StatusBadge,
  Avatar,
  AvatarStack,
  Icon,
  styled,
} from '../src/index.js'
import AvatarSpec from './AvatarGrid/specs/Avatar'

const stories = storiesOf('ArticleCard', module)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => {
  return (
    <Artboard
      name="hsds-article-card"
      artboardHeight={200}
      withCenterGuides={false}
      showGuides={false}
    >
      <div style={{ background: '#f2f2f2', padding: 20, minWidth: 320 }}>
        {storyFn()}
      </div>
    </Artboard>
  )
})

const fixtures = AvatarSpec.generate(5)
const avatarsMarkup = fixtures.map(avatar => {
  const { name, image } = avatar
  return <Avatar image={image} key={name} name={name} status={null} />
})

const baseGuide = {
  position: 'absolute',
  width: '100%',
  zIndex: 1000,
}

export const guides = [
  {
    ...baseGuide,
    height: 20,
  },
  {
    ...baseGuide,
    height: 22,
    top: 'none',
    bottom: 0,
  },
  {
    ...baseGuide,
    height: '100%',
    width: 20,
  },
  {
    ...baseGuide,
    height: '100%',
    left: 'none',
    right: 0,
    width: 20,
  },
  {
    ...baseGuide,
    height: 5,
    top: 'none',
    color: 'blue',
    bottom: -4,
  },
]

export function makeGuides(guides) {
  return guides.map((guide, key) => <Guide key={key} {...guide} />)
}

const ArticleSpec = createSpec({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
})

const article = ArticleSpec.generate()

stories.add('default', () => {
  const { content, title } = article

  const metaHeaderConfig = boolean('metaHeader', false)
  const footerConfig = boolean('footer', false)
  const consecutive = boolean('Multiple Cards', false)

  const props = {
    content: text('content', content),
    href: text('href', '#'),
    title: text('title', title),
    isHovered: boolean('isHovered', false),
    metaHeader: metaHeaderConfig && metaHeader(),
    footer: footerConfig && footer(),
  }

  return (
    <div style={{ position: 'relative' }}>
      <GuideContainer position="absolute" width="100%" height="100%">
        {makeGuides(guides)}
      </GuideContainer>
      <ArticleCard {...props} />
      {consecutive && <ArticleCard {...props} />}
    </div>
  )
})

stories.add('content markup', () => {
  const content = (
    <Flexy>
      <Flexy.Block>
        <Text size={13} weight="500">
          Open me
        </Text>
      </Flexy.Block>
      <Flexy.Item>
        <Icon name="minimize" shade="extraMuted" />
      </Flexy.Item>
    </Flexy>
  )

  return <ArticleCard content={content} />
})

function metaHeader() {
  return (
    <Flexy align="top">
      <Flexy.Block>
        <Text faint size="12">
          Last updated 1 day ago
        </Text>
      </Flexy.Block>
      <Flexy.Item>
        <StatusBadge count={20} status={'new'} />
      </Flexy.Item>
    </Flexy>
  )
}

function footer() {
  return (
    <AvatarStack max={5} size="sm" version={2}>
      {avatarsMarkup}
    </AvatarStack>
  )
}
