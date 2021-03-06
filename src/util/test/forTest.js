// @flow
import React from 'react'

const forTest = (name, value) => {
  const v = (value === undefined) ? { value: 'is undefined' } : value
  console.log(name, v)
  return (
    <pre style={{ display: 'none'}} id={`forTest__${name}`}>{JSON.stringify(v)}</pre>
  )
}

export default forTest
