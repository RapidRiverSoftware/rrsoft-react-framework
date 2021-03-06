// @flow

import React from 'react'
import BaseDatagrid from './BaseDatagrid'
import range from 'lodash/range'

const pageRange = (currentPage, totalPage) => {
  let firstPage = currentPage
  let lastPage = currentPage

  if (!currentPage) return {}

  let remainingPage = 9

  let safeGuard = 15

  while(remainingPage > 0) {
    if (firstPage > 1) {
      firstPage -= 1
      remainingPage -= 1
    }

    if (lastPage < totalPage && remainingPage > 0) {
      lastPage += 1
      remainingPage -= 1
    }

    safeGuard--
    if (safeGuard < 0) {
      throw new Error(`datagrid pagination is looping too many times, currentPage:[${currentPage}]`)
    }

    if (firstPage <= 1 && lastPage >= totalPage) break;
  }

  return { firstPage, lastPage }
}

const paginateStyle = {
  display: 'inline-block',
  paddingLeft: '2px'
}


const Datagrid = ({ pageData, handlePageClick, ...props }) => {
  const { firstPage, lastPage } = pageRange(pageData.current_page, pageData.total_page);

  const renderPagination = (page) => {
    const item = (page !== pageData.current_page) ?
      <a href="#" onClick={() => handlePageClick(page)}>{page}</a> :
      page

    return (
      <div style={paginateStyle} key={page}>
        {item}
      </div>
    )
  }

  return (
    <div>
      <BaseDatagrid
        {...props}
        data={pageData.data}
      />

      { (firstPage !== lastPage) ?
        range(firstPage, lastPage + 1).map(p => renderPagination(p)) :
        null
      }
    </div>

  )
}

export default Datagrid
