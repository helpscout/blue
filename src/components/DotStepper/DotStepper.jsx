import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Tooltip from '../Tooltip'
import { DotStepperUI, BulletUI, ProgressBulletUI } from './DotStepper.css'
import { classNames } from '../../utilities/classNames'

class DotStepper extends React.Component {
  getClassName() {
    const { className } = this.props
    return classNames('c-DotStepper', className)
  }

  getTitle() {
    const { numSteps, step } = this.props
    return `Step ${step} of ${numSteps}`
  }

  renderSteps() {
    const { numSteps } = this.props
    let markup = []

    for (let i = 0; i < numSteps; i += 1) {
      markup.push(<BulletUI key={i}>•</BulletUI>)
    }

    return markup
  }

  render() {
    const { className, step, ...rest } = this.props
    const title = this.getTitle()

    return (
      <Tooltip title={title} placement="bottom" trigger="click">
        <DotStepperUI
          aria-label={title}
          className={this.getClassName()}
          {...getValidProps(rest)}
        >
          {this.renderSteps()}
          <ProgressBulletUI step={step} />
        </DotStepperUI>
      </Tooltip>
    )
  }
}

DotStepper.propTypes = {
  'data-cy': PropTypes.string,
  numSteps: PropTypes.number,
  step: PropTypes.number,
}

DotStepper.defaultProps = {
  'data-cy': 'DotStepper',
  numSteps: 1,
  step: 1,
}

export default DotStepper
