// @flow
import React from 'react';
import { HeaderCell } from '../Table';

type Props = {
  sortable?: boolean,
  direction?: 'desc' | 'asc' | null,
  label?: string | React.Element<*>,
  cellStyles?: {
    width?: string | number,
    align?: 'left' | 'right' | 'center',
  },
  handleClick?: Function,
};

const renderDirection = (direction) => {
  if (direction === 'desc') {
    return <span>&#x25BC;&nbsp;</span>;
  } else if (direction === 'asc') {
    return <span>&#x25B2;&nbsp;</span>;
  }
    return <span></span>;
};

const Cell = ({ sortable = false, direction, label, cellStyles, handleClick }: Props) =>
  (<HeaderCell
    onClick={handleClick ? () => (handleClick && handleClick()) : null}
    {...cellStyles}
  >
    {sortable && renderDirection(direction)}
    {label || ''}
  </HeaderCell>);

export default Cell;
