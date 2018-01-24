// @flow

import React from 'react'
import headerRenderer from './headerRenderer'
import bodyRenderer from './bodyRenderer'

type StandardField = {
  fieldName: string,
  handleClick?: () => void,
  label?: string | React$Element<any>,
  width?: string | number,
  align?: 'left' | 'right' | 'center',
};

type CustomRender = {
  render: (row: Object, actions?: Object) => any,
  handleClick?: () => void,
  label?: string | React$Element<any>,
  width?: string | number,
  align?: 'left' | 'right' | 'center',
};

type ColumnShape = StandardField | CustomRender;

const Datagrid = ({ columns, data }) => {
  return (
    <table border="1">
      <thead>{ headerRenderer(columns) }</thead>
      <tbody>{ bodyRenderer(columns, data) }</tbody>
    </table>
  )
}

export default Datagrid
