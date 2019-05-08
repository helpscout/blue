import * as React from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const defaultProps = {
  onDragStart: noop,
}

const DragHandle = SortableHandle(props => {
  const { className, onDragStart, onDragEnd, ...rest } = props

  const componentClassName = classNames('c-SortableDragHandle', className)

  return (
    <div
      {...getValidProps(rest)}
      className={componentClassName}
      onMouseDown={onDragStart}
    >
      <Icon name="drag-handle" ignoreClick={false} />
    </div>
  )
})

DragHandle.defaultProps = defaultProps

export default DragHandle
