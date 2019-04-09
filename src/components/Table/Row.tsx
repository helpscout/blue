import * as React from 'react'

import Cell from './Cell'
import { TABLE_CLASSNAME } from './Table'
import { generateCellKey } from './Table.utils'

import { RowProps } from './types'

export default class Row extends React.PureComponent<RowProps> {
  handleRowClick = e => {
    const { row, onRowClick } = this.props
    onRowClick && onRowClick(e, row)
  }

  render() {
    const { row, columns } = this.props

    return (
      <tr className={`${TABLE_CLASSNAME}__Row`} onClick={this.handleRowClick}>
        {columns.map(column => (
          <Cell
            column={column}
            row={row}
            key={generateCellKey('cell', column)}
          />
        ))}
      </tr>
    )
  }
}
