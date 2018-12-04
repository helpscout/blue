import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Collapsible } from '../src/index.js'

class SampleComponent extends Component {
  constructor() {
    super()
    this.state = { open: false }
    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  handleToggleOpen() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { children, ...rest } = this.props
    const { open } = this.state
    const handleToggleOpen = this.handleToggleOpen

    return (
      <div>
        <Button onClick={handleToggleOpen}>Toggle</Button>
        <br />
        <Collapsible isOpen={open} {...rest}>
          {children}
        </Collapsible>
      </div>
    )
  }
}

const action = () => {
  console.log('action')
}

storiesOf('Collapsible', module).add('default', () => (
  <div>
    <SampleComponent onOpen={action} onClose={action}>
      <div style={{ background: '#eee', height: 200 }}>Hello!</div>
    </SampleComponent>
    <br />
    <SampleComponent onOpen={action} onClose={action}>
      <div style={{ background: '#eee', height: 200 }}>Hello!</div>
    </SampleComponent>
  </div>
))
