import { UISize, UIState } from '../../constants/types'

export type InputAddOnProps = {
  children?: any
  className?: string
  isFirst: boolean
  isNotOnly: boolean
  isLast: boolean
}

export type InputStaticProps = {
  align: 'left' | 'center' | 'right' | ''
  children?: any
  className?: string
  size: UISize
}

export type InputNode = HTMLInputElement | HTMLTextAreaElement
export type InputEvent = Event
export type WheelEvent = Event
export type AnyInputEvent = InputEvent | WheelEvent | Event
export type InputValue = string

export type InputProps = {
  action?: any
  autoFocus: boolean
  className: string
  disabled: boolean
  errorIcon?: string
  errorMessage?: string
  forceAutoFocusTimeout: number
  hasInsertCarriageReturns: boolean
  helpText: any
  hintText: any
  id: string
  inlinePrefix?: string
  inlineSuffix?: string
  innerRef: (ref: HTMLElement) => void
  inputRef: (ref: HTMLElement) => void
  isFirst: boolean
  isFocused: boolean
  isLast: boolean
  isNotOnly: boolean
  isSubtleReadOnly: boolean
  label: any
  maxHeight: number | string
  modalhelpText: string
  moveCursorToEnd: boolean
  multiline: boolean | number
  name: string
  offsetAmount: number
  onBlur: (event: AnyInputEvent) => void
  onChange: (value: InputValue) => void
  onEnterDown: (event: AnyInputEvent) => void
  onEnterUp: (event: AnyInputEvent) => void
  onFocus: (event: AnyInputEvent) => void
  onKeyDown: (event: AnyInputEvent) => void
  onKeyUp: (event: AnyInputEvent) => void
  onScroll: (event: AnyInputEvent) => void
  onResize: (height: number) => void
  onStartTyping: (now?: number) => void
  onStopTyping: () => void
  onWheel: (event: AnyInputEvent) => void
  placeholder: string
  prefix: any
  readOnly: boolean
  refApplyCallStopTyping: (fn: () => void) => void
  removeStateStylesOnFocus: boolean
  resizable: boolean
  scrollLock: boolean
  seamless: boolean
  size: UISize
  state?: UIState
  style: Object
  suffix: any
  type: string
  typingThrottleInterval: number
  typingTimeoutDelay: number
  value: InputValue
  withTypingEvent: false
}

export type InputState = {
  id: string
  isFocused: boolean
  height?: number
  state?: UIState
  typingThrottle: number | undefined
  typingTimeout: number | undefined
  value: InputValue
}

export type InputBackfropV2Props = {
  className?: string
  choiceKind?: string
  disabled: boolean
  isFilled: boolean
  isFocused: boolean
  isFirst: boolean
  isNotOnly: boolean
  isLast: boolean
  isSeamless: boolean
  kind?: string
  readOnly: boolean
  showFocus: boolean
  state?: UIState
}

export interface InputPrefixProps {
  className?: string
  isSeamless: boolean
}

export interface InputSuffixProps {
  className?: string
  isAction: boolean
  isSeamless: boolean
}

export type RefNode = HTMLDivElement | null

export interface InputResizerProps {
  className?: string
  contents: string
  currentHeight?: number
  minimumLines: number
  offsetAmount: number
  onResize: (size: number) => void
  seamless: boolean
}
