// @flow
import React from 'react';
import Checkbox from '../Checkbox';
import { HeaderCell } from '../Table';

type Props = {
  allRows: Array<Object>,
  checkedRows: Array<Object>,
  onCheckChange: (checkedRows: Array<Object>) => void,
};

export default ({ allRows, checkedRows = [], onCheckChange = () => {} }: Props) => (
  <HeaderCell align="right" width={12} pad={{ top: 25, left: 10 }} valign="top">
    <Checkbox
      onChange={(checked) => {
        if (checked) {
          onCheckChange(allRows);
        } else {
          onCheckChange([]);
        }
      }}
      checked={allRows.length === checkedRows.length}
      partiallyChecked={checkedRows.length > 0 && checkedRows.length < allRows.length}
    />
  </HeaderCell>
);
