// @flow

import React from 'react'
import BaseDatagrid from './BaseDatagrid'
import range from 'lodash/range'

const pageRange = (currentPage, totalPage) => {
  let firstPage = currentPage
  let lastPage = currentPage

  if (!currentPage) return {}

  let remainingPage = 9

  while(remainingPage > 0) {
    if (firstPage > 1) {
      firstPage -= 1
      remainingPage -= 1
    }

    if (lastPage < totalPage && remainingPage > 0) {
      lastPage += 1
      remainingPage -= 1
    }

    if (firstPage <= 1 && lastPage >= totalPage) break;
  }
  console.log(firstPage)
  console.log(lastPage)

  return { firstPage, lastPage }
}

const Datagrid = ({ pageData, handlePageClick, ...props }) => {
  const { firstPage, lastPage } = pageRange(pageData.current_page, pageData.total_page);
  console.log('pd',pageData)

  return (
    <div>
      <BaseDatagrid
        {...props}
        data={pageData.data}
      />
      { range(firstPage, lastPage + 1).map(p => <div><a href="#" onClick={() => handlePageClick(p)}>{p}</a></div>) }
    </div>

  )
}

export default Datagrid
