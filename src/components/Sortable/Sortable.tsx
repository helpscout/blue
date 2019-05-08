import * as React from 'react'
import arrayMove from 'array-move'
import { classNames } from '../../utilities/classNames'
import DragHandle from './Sortable.DragHandle'
import Item from './Sortable.Item'
import List from './Sortable.List'
import { SortableProps } from './Sortable.types'
import { includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'

export { default as arrayMove } from 'array-move'

class Sortable extends React.PureComponent<SortableProps> {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  static defaultProps = {
    onSortStart: noop,
    onSortMove: noop,
    onSortEnd: noop,
  }

  componentWillMount() {
    this.remapChildrenToState()
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    /* Note: There are tests for this, but for some reason, Istanbul isn't
     * picking it up */
    if (this.props.children !== nextProps.children) {
      this.remapChildrenToState(nextProps.children)
    }
  }

  remapChildrenToState(children = this.props.children) {
    if (!children) return

    const items = React.Children.map(children, (child: any, index) => {
      const sortableElement = includes(
        child.type.displayName,
        'sortableElement'
      )
      const key = child.props.id ? child.props.id : `item-${index}`

      if (sortableElement) {
        return React.cloneElement(child, {
          index,
          key,
        })
      }

      const childProps =
        child.props.sortable !== undefined ? { sortable: true } : {}

      return (
        <Item key={key} index={index}>
          {React.cloneElement(child, childProps)}
        </Item>
      )
    })

    this.setState({ items })
  }

  // Based on the implementation of react-sortable-hoc
  // https://github.com/clauderic/react-sortable-hoc/#basic-example
  /* istanbul ignore next */
  onSortEnd({ oldIndex, newIndex, collection }, event) {
    /* istanbul ignore next */
    this.setState({
      // TODO: fix typescript complains
      // @ts-ignore
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })
    /* istanbul ignore next */
    if (this.props.onSortEnd) {
      this.props.onSortEnd({ oldIndex, newIndex, collection }, event)
    }
  }

  render() {
    const {
      className,
      children,
      useDragHandle,
      helperClass,
      onSortEnd,
      ...rest
    } = this.props
    // TODO: fix typescript complains
    // @ts-ignore
    const { items } = this.state

    const componentClassName = classNames('c-Sortable', className)
    const helperClassName = classNames('is-sorting', helperClass)

    return (
      <div className={componentClassName}>
        <List
          dragHandle={useDragHandle}
          helperClass={helperClassName}
          items={items}
          onSortEnd={this.onSortEnd}
          useDragHandle={useDragHandle}
          {...rest}
        />
      </div>
    )
  }
}

// TODO: fix typescript complains
// @ts-ignore
Sortable.DragHandle = DragHandle
// TODO: fix typescript complains
// @ts-ignore
Sortable.Item = Item
// TODO: fix typescript complains
// @ts-ignore
Sortable.List = List

export default Sortable
