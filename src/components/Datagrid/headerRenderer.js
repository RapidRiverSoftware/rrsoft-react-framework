// @flow

import React from 'react'

const headerRenderer = (columns) => {
  return (
    <tr>
      {
        columns.map((col, idx) => (
          <td key={idx}>{col.label}</td>
        ))
      }
    </tr>
  )
}

export default headerRenderer
