// @flow

import React from 'react'

const headerRenderer = (columns) => {
  return (
    <tr>
      {
        columns.map(col => (
          <td>{col.label}</td>
        ))
      }
    </tr>
  )
}

export default headerRenderer
