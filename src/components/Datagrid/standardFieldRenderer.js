// @flow

import isArray from 'lodash/isArray'

const standardFieldRenderer = (col, row) => {
  const value = row[col.fieldName]
  if (isArray(value)) {
    return value.join(', ')
  }

  return value
}

export default standardFieldRenderer
