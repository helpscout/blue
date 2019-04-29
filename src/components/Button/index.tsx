import React, { PureComponent as Component } from 'react'
import { propConnect } from '../PropProvider/index'
import ButtonV2 from './ButtonV2'
import Button from './Button'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Button.utils'

type Props = {
  version?: number
}

class WrappedButton extends Component<Props> {
  render() {
    const { version, ...rest } = this.props

    return version === 2 ? <ButtonV2 {...rest} /> : <Button {...rest} />
  }
}

namespaceComponent(COMPONENT_KEY)(WrappedButton)

export default propConnect(COMPONENT_KEY)(WrappedButton)