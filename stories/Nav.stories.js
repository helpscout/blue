import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from '../src/components/Nav'
import Toolbar from '../src/components/Toolbar'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Nav', module)

stories.addDecorator(
  withArtboard({
    width: 600,
    height: 200,
    withCenterGuides: false,
    withResponsiveWidth: true,
    showInterface: false,
  })
)

const RouteComponent = () => <div />

const BaseNav = () => {
  const itemHome = text('itemHomeText', 'Home')
  const itemOne = text('itemOneText', 'One')
  const itemTwo = text('itemTwoText', 'Two')
  const itemThree = text('itemThreeText', 'Three')
  const itemThreeError = text('itemThreeError', 'Something went wrong')
  const itemFour = text('itemFourText', 'Four')
  const itemFourDisabled = boolean('itemFourDisabled', true)

  return (
    <Nav>
      <Nav.Item to="/">{itemHome}</Nav.Item>
      <Nav.Item to="/one">{itemOne}</Nav.Item>
      <Nav.Item to="/two">{itemTwo}</Nav.Item>
      <Nav.Item to="/three" error={itemThreeError}>
        {itemThree}
      </Nav.Item>
      <Nav.Item to="/four" disabled={itemFourDisabled}>
        {itemFour}
      </Nav.Item>
    </Nav>
  )
}

stories.add('Default', () => (
  <Router>
    <div>
      <BaseNav />
      <Route exact path="/" component={RouteComponent} />
      <Route exact path="/one" component={RouteComponent} />
      <Route exact path="/two" component={RouteComponent} />
      <Route exact path="/three" component={RouteComponent} />
    </div>
  </Router>
))

stories.add('Toolbar', () => {
  // Solution to work around React-Router's rendering
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
  const NavBar = () => (
    <Toolbar>
      <Toolbar.Block>
        <BaseNav />
      </Toolbar.Block>
    </Toolbar>
  )

  return (
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={RouteComponent} />
        <Route exact path="/one" component={RouteComponent} />
        <Route exact path="/two" component={RouteComponent} />
        <Route exact path="/three" component={RouteComponent} />
      </div>
    </Router>
  )
})
