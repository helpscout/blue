import * as React from 'react'

import * as equal from 'fast-deep-equal'

import HeaderCell from './Table.HeaderCell'
import { TABLE_CLASSNAME } from './Table'
import { generateCellKey } from './Table.utils'

import { HeadProps } from './Table.types'
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}
export default class Head extends React.Component<HeadProps> {
  static whyDidYouRender = true
  shouldComponentUpdate(nextProps) {
    const { columns, sortedInfo } = this.props

    if (!equal(sortedInfo, nextProps.sortedInfo)) {
      return true
    }

    if (!equal(columns, nextProps.columns)) {
      return true
    }

    return false
  }

  render() {
    const { isLoading, columns, sortedInfo } = this.props
    return (
      <thead>
        <tr className={`${TABLE_CLASSNAME}__HeaderRow`}>
          {columns.map(column => (
            <HeaderCell
              key={generateCellKey('headercell', column)}
              column={column}
              isLoading={isLoading}
              sortedInfo={sortedInfo}
            />
          ))}
        </tr>
      </thead>
    )
  }
}
