import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ContentUI } from './Modal.css'
import Body from './Modal.Body'

class ModalContent extends React.PureComponent {
  static displayName = 'ModalContent'
  static propTypes = {
    className: PropTypes.string,
    scrollableRef: PropTypes.func,
  }
  static defaultProps = {
    scrollableRef: noop,
  }

  render() {
    const { className, children, scrollableRef, ...rest } = this.props
    const componentClassName = classNames('c-ModalContent', className)
    const childrenMarkup = React.Children.map(children, child => {
      if (child && child.type === Body) {
        return React.cloneElement(child, {
          scrollableRef,
        })
      }

      return child
    })

    return (
      <ContentUI className={componentClassName} {...rest}>
        {childrenMarkup}
      </ContentUI>
    )
  }
}

export default ModalContent
