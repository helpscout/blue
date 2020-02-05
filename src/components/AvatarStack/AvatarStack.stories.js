import React, { PureComponent as Component } from 'react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import { Avatar, AvatarStack } from '../index'

export default {
  component: AvatarStack,
  title: 'Components/AvatarStack',
}

const fixtures = AvatarSpec.generate(5)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image, status } = avatar
  return <Avatar image={image} key={name} name={name} status={status} />
})

class TestComponent extends Component {
  constructor() {
    super()
    this.state = { someProp: 0 }
    this.updateState = this.updateState.bind(this)
  }
  updateState() {
    this.setState({
      someProp: this.state.someProp + 1,
    })
  }
  render() {
    console.log(`AvatarStack: TestComponent: render(${this.state.someProp})`)
    return (
      <div>
        <AvatarStack max={5}>{avatarsMarkup}</AvatarStack>
        <button onClick={this.updateState}>Update: State</button>
      </div>
    )
  }
}

export const Default = () => <AvatarStack max={5}>{avatarsMarkup}</AvatarStack>

Default.story = {
  name: 'default',
}

export const AnimationEasing = () => (
  <AvatarStack animationEasing="bounce" animationSequence="fade scale" max={4}>
    {avatarsMarkup}
  </AvatarStack>
)

AnimationEasing.story = {
  name: 'animation: easing',
}

export const TestRender = () => <TestComponent />

TestRender.story = {
  name: 'test: render',
}
