import styled from '../styled'
import Text from '../Text'
import baseStyles from '../../styles/resets/baseStyles.css'
import { getColor } from '../../styles/utilities/color'

export const config = {
  activeColor: getColor('green.500'),
  backgroundColor: 'white',
  inactiveColor: getColor('grey.500'),
  circleSize: '15px',
  lineHeight: '3px',
  lineColor: getColor('grey.400'),
  progressLineColor: getColor('green.500'),
  textActiveColor: getColor('charcoal.500'),
  textInactiveColor: getColor('charcoal.200'),
  spacingOffset: '45px',
  circleTransition: '100ms ease',
  transition: '200ms ease',
}

export const StepperUI = styled('div')`
  ${baseStyles};
  position: relative;
  margin: 0 auto;
`

export const StepWrapperUI = styled('div')`
  ${baseStyles};
  display: flex;
`

export const StepUI = styled('div')`
  ${baseStyles};
  color: ${config.textInactiveColor};
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-left: ${config.spacingOffset};
  padding-right: ${config.spacingOffset};
  padding-bottom: calc(15px + ${config.circleSize});
  position: relative;
  text-align: center;

  &.is-clickable {
    cursor: pointer;
  }

  &.is-active {
    color: ${config.textActiveColor};
    font-weight: 500;
  }

  &:first-of-type {
    .c-StepperStepLine,
    .c-StepperStepProgress {
      left: 50%;
    }
  }

  &:last-of-type {
    .c-StepperStepLine,
    .c-StepperStepProgress {
      right: 50%;
    }

    .c-StepperStepProgress {
      width: 50%;
    }
  }
`

export const GhostTitleUI = styled(Text)`
  display: block;
  font-weight: 500;
  height: 0;
  visibility: hidden;
`

export const CircleUI = styled('div')`
  ${baseStyles};
  background: ${config.backgroundColor};
  box-shadow: 0 0 0 3px ${config.backgroundColor};
  border: 3px solid currentColor;
  border-radius: 9999px;
  color: ${config.inactiveColor};
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: calc(${config.circleSize} / 2 * -1);
  height: ${config.circleSize};
  width: ${config.circleSize};
  transition: all ${config.circleTransition};
  will-change: box-shadow, border;
  z-index: 1;

  ${({ isActive }) =>
    isActive &&
    `
    box-shadow: 0 0 0 0;
    color: ${config.activeColor};
  `};
`

export const LineUI = styled('div')`
  ${baseStyles};
  background: ${config.lineColor};
  bottom: 6px;
  left: 0;
  position: absolute;
  right: 0;
  height: ${config.lineHeight};
`
LineUI.defaultProps = {
  className: 'c-StepperStepLine',
}

export const ProgressLineUI = styled(LineUI)`
  border-bottom-right-radius: ${config.lineHeight};
  border-top-right-radius: ${config.lineHeight};
  background: ${config.progressLineColor};
  transition: transform ${config.transition};
  transform: scaleX(0);
  transform-origin: left;
  width: 100%;
  will-change: transform;

  &.is-active {
    transform: scaleX(1);
  }
`
