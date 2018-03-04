// @flow

import React from 'react'
import styled, { withTheme } from 'styled-components'
import headerRenderer from './headerRenderer'
import bodyRenderer from './bodyRenderer'
import first from 'lodash/first'
import last from 'lodash/last'
import forTest from '../../util/test/forTest'

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
  const name = props.name || 'default'

  return (
    <div>

      { forTest(`datagrid_${name}_firstRow`, first(data)) }
      { forTest(`datagrid_${name}_lastRow`, last(data)) }

      <Table {...props}>
        <table>
          <thead>{ headerRenderer(columns) }</thead>
          <tbody>{ bodyRenderer(columns, data, actions, props) }</tbody>
        </table>
      </Table>
    </div>
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
