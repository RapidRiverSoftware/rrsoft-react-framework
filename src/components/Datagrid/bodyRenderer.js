// @flow

import React from 'react'
import standardFieldRenderer from './standardFieldRenderer'
import customFieldRenderer from './customFieldRenderer'

const renderCell = (col, row, actions) => {
  if (col.render) {
    return customFieldRenderer(col, row, actions)
  } else {
    return standardFieldRenderer(col, row)
  }
}

const bodyRenderer = (columns, data, actions) => {
  return data.map((row, ridx) => (
    <tr key={ridx}>
      { columns.map((col, cidx) => <td key={cidx}>{ renderCell(col, row, actions) }</td>) }
    </tr>
  ))
}

export default bodyRenderer
