import React, { Component } from 'react'

import { Table } from '../../src/index.js'
import Pagination from '../../src/components/Pagination'
import { Wrapper } from './commonComponents'
import {
  createFakeCustomers,
  getCurrentPageData,
} from '../../src/components/Table/__tests__/utils'

export default class TableWithPagination extends Component {
  constructor(props) {
    super(props)
    const data = createFakeCustomers({ amount: 100 })
    const paginatedData = data.slice(0, 10)

    this.state = {
      data,
      paginatedData,
      columns: [
        {
          title: 'Name',
          columnKey: 'name',
          width: '33%',
        },
        {
          title: 'Company',
          columnKey: 'companyName',
          width: '33%',
        },
        {
          title: 'Email',
          columnKey: 'emails',
          width: '34%',
        },
      ],
      loadingData: false,
      tableWidth: { min: '700px' },
      containerWidth: '100%',
      activePage: 1,
    }
  }

  render() {
    const {
      data,
      columns,
      isLoading,
      tableWidth,
      containerWidth,
      activePage,
      paginatedData,
    } = this.state

    return (
      <Wrapper>
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={isLoading}
          tableWidth={tableWidth}
          containerWidth={containerWidth}
        />
        <Pagination
          subject="Customer"
          activePage={activePage}
          showNavigation={true}
          rangePerPage={10}
          totalItems={data.length}
          onChange={this.handlePageChange}
        />
      </Wrapper>
    )
  }

  handlePageChange = nextPage => {
    const { data } = this.state

    this.setState({
      isLoading: true,
    })

    getCurrentPageData(data, nextPage).then(page => {
      this.setState({
        activePage: nextPage,
        paginatedData: page,
        isLoading: false,
      })
    })
  }
}
