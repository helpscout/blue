import * as React from 'react'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

export type ReferenceChildrenProps = { ref: (HTMLElement?) => void }
export type ReferenceProps = {
  children: ReferenceChildrenProps
  innerRef?: (HTMLElement?) => void
}

type InnerReferenceProps = {
  getReferenceRef?: (HTMLElement?) => void
}

class InnerReference extends React.Component<
  ReferenceProps & InnerReferenceProps
> {
  refHandler = (node?: HTMLElement) => {
    safeInvoke(this.props.innerRef, node)
    safeInvoke(this.props.getReferenceRef, node)
  }

  render() {
    return unwrapArray(this.props.children, { ref: this.refHandler })
  }
}

export default function Reference(props) {
  return (
    <ManagerContext.Consumer>
      {({ getReferenceRef }) => (
        <InnerReference getReferenceRef={getReferenceRef} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}
