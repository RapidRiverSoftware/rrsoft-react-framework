// @flow
import React from 'react';
import { BodyCell } from '../Table';

type Props = {
  row: any,
  column: any,
  options: Object,
  actions?: Object,
  cellStyles?: {
    align?: 'left' | 'right' | 'center',
  }
};

const renderStandardField = (row, fieldName, cellStyles) =>
  (<BodyCell {...cellStyles}>
    {row[fieldName]}
  </BodyCell>);

const renderCustom = (row, render, actions, cellStyles, options) =>
  (<BodyCell {...cellStyles}>
    {render(row, actions, options)}
  </BodyCell>);

const Cell = ({ row, column, actions, cellStyles, options }: Props) => {
  if (column.render) {
    return renderCustom(row, column.render, actions, cellStyles, options);
  }
  return renderStandardField(row, column.fieldName, cellStyles);
};

export default Cell;
