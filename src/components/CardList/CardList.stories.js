import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { boolean, text, number } from '@storybook/addon-knobs'
import { ArticleCard, CardList } from '../index'

export default {
  component: CardList,
  title: 'Components/Structural/CardList',
}

const CardSpec = createSpec({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
  key: faker.random.uuid(),
})

export const Default = () => {
  class Example extends React.Component {
    state = {
      cards: [],
    }

    render() {
      return (
        <div style={{ margin: 'auto', maxWidth: 420 }}>
          <CardList {...this.props}>
            {this.props.cards.map(card => {
              return <ArticleCard {...card} />
            })}
          </CardList>
        </div>
      )
    }
  }

  const cards = number('cards', 3) || 0
  const props = {
    cards: CardSpec.generate(cards),
    animationDelay: number('animationDelay', 0),
    animationEasing: text('animationEasing', 'ease'),
    animationSequence: text('animationSequence', 'fade up'),
    animationStagger: number('animationStagger', 60),
    stagger: boolean('stagger', true),
  }

  return <Example {...props} />
}
