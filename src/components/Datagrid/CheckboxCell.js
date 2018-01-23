// @flow
import React from 'react';
import find from 'lodash/find';
import reject from 'lodash/reject';
import concat from 'lodash/concat';
import Checkbox from '../Checkbox';
import { BodyCell } from '../Table';

type Props = {
  row: any,
  checkedRows: Array<Object>,
  onCheckChange: (checkedRows: Array<Object>) => void,
};

export default ({ row, checkedRows = [], onCheckChange = () => {} }: Props) => {
  const onChange = (checked) => {
    if (checked) {
      onCheckChange(concat(checkedRows, row));
    } else {
      onCheckChange(reject(checkedRows, { id: row.id }));
    }
  };

  return (
    <BodyCell align="right" width={12} pad={{ top: 23, left: 10 }} valign="top">
      <Checkbox onChange={onChange} checked={find(checkedRows, { id: row.id })} />
    </BodyCell>
  );
};
