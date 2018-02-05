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

const Datagrid = ({ pageData, handlePageClick, ...props }) => {
  const { firstPage, lastPage } = pageRange(pageData.current_page, pageData.total_page);

  return (
    <div>
      <BaseDatagrid
        {...props}
        data={pageData.data}
      />
      { range(firstPage, lastPage + 1).map(p => <div key={p}><a href="#" onClick={() => handlePageClick(p)}>{p}</a></div>) }
    </div>

  )
}

export default Datagrid
