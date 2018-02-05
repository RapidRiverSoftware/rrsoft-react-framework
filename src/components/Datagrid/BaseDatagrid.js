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

const BaseDatagrid = ({ columns, data, actions, ...props }) => {
  return (
    <Table {...props}>
      <table>
        <thead>{ headerRenderer(columns) }</thead>
        <tbody>{ bodyRenderer(columns, data, actions, props) }</tbody>
      </table>
    </Table>
  )
}

const Table = withTheme(styled.div`
  font-size: ${({ theme }) => theme.fontSize(3)};

  table {
    width: 100%;
  }
  th {
    font-weight: ${({ theme }) => theme.fontWeight(9)};
    padding: ${({ theme }) => theme.gap(2)}px ${({ theme }) => theme.gap(4)}px;
    text-transform: capitalize;
    text-align: left;
    border-bottom: 1px solid #212121;
  }
  td {
    padding: ${({ theme }) => theme.gap(2)}px ${({ theme }) => theme.gap(4)}px;
    border-top: 1px solid ${({ theme }) => theme.primaryBorderColor(2)};
  }

  button, button.link {
    font-size: ${({ theme }) => theme.fontSize(3)};
  }
`)

export default BaseDatagrid
