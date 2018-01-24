// @flow

import React from 'react'
import standardFieldRenderer from './standardFieldRenderer'
import customFieldRenderer from './customFieldRenderer'

const renderCell = (col, row) => {
  if (col.render) {
    return customFieldRenderer(col, row)
  } else {
    return standardFieldRenderer(col, row)
  }
}

const bodyRenderer = (columns, data) => {
  return data.map((row, ridx) => (
    <tr key={ridx}>
      { columns.map((col, cidx) => <td key={cidx}>{ renderCell(col, row) }</td>) }
    </tr>
  ))
}

export default bodyRenderer
