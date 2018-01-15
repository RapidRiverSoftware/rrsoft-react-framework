// @flow

import React from 'react'

const headerRenderer = (columns) => {
  return (
    <tr>
      {
        columns.map((col, idx) => (
          <th key={idx}>{col.label}</th>
        ))
      }
    </tr>
  )
}

export default headerRenderer
