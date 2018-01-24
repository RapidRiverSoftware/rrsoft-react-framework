// @flow

const customFieldRenderer = (col, row) => {
  return row[col.fieldName]
}

export default customFieldRenderer
