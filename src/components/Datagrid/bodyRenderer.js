// @flow

import React from 'react'
import standardFieldRenderer from './standardFieldRenderer'
import customFieldRenderer from './customFieldRenderer'

const renderCell = (col, row, actions, props, ridx) => {
  if (col.render) {
    return customFieldRenderer(col, row, actions, props, ridx)
  } else {
    return standardFieldRenderer(col, row)
  }
}

const bodyRenderer = (columns, data, actions, props) => {
  return data.map((row, ridx) => (
    <tr key={ridx}>
      { columns.map((col, cidx) => <td key={cidx} style={{verticalAlign: 'top'}}>{ renderCell(col, row, actions, props, ridx) }</td>) }
    </tr>
  ))
}

export default bodyRenderer
