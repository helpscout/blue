import { DropdownProps } from '../Dropdown/Dropdown.types'

export interface ActionSelectBaseProps {
  animationDuration: number
  animationEasing: string
  onAnimationEnd: () => void
  onAnimationUpdate: () => void
  children?: any
  className?: string
  mainRef?: (node: HTMLElement) => void
  isFadeContentOnOpen: boolean
  onResize: () => void
  selectedKey?: string
}

export interface ActionSelectProps
  extends ActionSelectBaseProps,
    DropdownProps {
  children?: any
  isAutoFocusNodeOnSelect: boolean
  shouldRefocusOnClose: (...args: any[]) => boolean
  shouldScrollIntoView: (...args: any[]) => boolean
  items: Array<any>
  onSelect: (item: Object, props: Object) => void
}

export interface ActionSelectState {
  isOpen: boolean
  resizeCount: number
  selectedItem?: any
}

export interface ActionSelectContentResizerProps extends ActionSelectBaseProps {
  onAnimationEnd: () => void
  borderWidth: number
  isOpen: boolean
  resizeCount: number
}

export interface ActionSelectContentResizerState {
  height: number | string
}
