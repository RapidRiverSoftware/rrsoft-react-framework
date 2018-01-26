// @flow

import React from 'react'
import styled, { withTheme } from 'styled-components'
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

const Datagrid = ({ columns, data, actions, ...props }) => {
  return (
    <Table {...props}>
      <table>
        <thead>{ headerRenderer(columns) }</thead>
        <tbody>{ bodyRenderer(columns, data, actions) }</tbody>
      </table>
    </Table>
  )
}

const Table = withTheme(styled.div`
  font-size: ${({ theme }) => theme.fontSize(4)};
  padding: ${({ theme }) => theme.gap(3)}px ${({ theme }) => theme.gap(4)}px;
  background-color: ${({ theme }) => theme.primaryTableBgColor(5)};
  border: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};
  margin: ${({ theme }) => theme.gap(5)}px;
  box-shadow: 1px 1px 1px ${({ theme }) => theme.primaryBorderColor(2)};

  table {
    width: 100%;
  }
  th {
    font-weight: ${({ theme }) => theme.fontWeight(9)};
    padding: ${({ theme }) => theme.gap(2)}px ${({ theme }) => theme.gap(4)}px;
    text-transform: capitalize;
    text-align: left;
  }
  td {
    padding: ${({ theme }) => theme.gap(2)}px ${({ theme }) => theme.gap(4)}px;
    border-top: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};
  }
`)

export default Datagrid
