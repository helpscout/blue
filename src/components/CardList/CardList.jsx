import React from 'react'
import Animate from '../Animate'
import AnimateGroup from '../AnimateGroup'
import { getComponentKey } from '../../utilities/component'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'

export class CardList extends React.PureComponent {
  static propTypes = {
    animationDelay: PropTypes.number,
    animationEasing: PropTypes.string,
    animationSequence: PropTypes.string,
    animationStagger: PropTypes.number,
    className: PropTypes.string,
    stagger: PropTypes.bool,
  }

  static defaultProps = {
    animationDelay: 0,
    animationEasing: 'ease',
    animationSequence: 'fade up',
    animationStagger: 60,
    stagger: true,
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      const key = getComponentKey(child, index)

      return <Animate key={key}>{child}</Animate>
    })
  }

  render() {
    const {
      animationDelay,
      animationSequence,
      animationStagger,
      animationEasing,
      className,
      stagger,
      ...rest
    } = this.props
    const componentClassName = classNames('c-CardList', className)

    return (
      <AnimateGroup
        {...rest}
        delay={animationDelay}
        easing={animationEasing}
        className={componentClassName}
        sequence={animationSequence}
        stagger={stagger}
        staggerDelay={animationStagger}
      >
        {this.getChildrenMarkup()}
      </AnimateGroup>
    )
  }
}

export default CardList
