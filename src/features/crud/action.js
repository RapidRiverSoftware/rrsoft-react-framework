// @flow

import {
  DELETE_ROW,
  SHOW_ROW,
} from './actionType';

export const deleteRow = (url, id, onSuccess) => ({
  type: DELETE_ROW,
  url,
  id,
  onSuccess
});

export const showRow = (url, row, ridx, onSuccess) => ({
  type: SHOW_ROW,
  url,
  row,
  ridx,
  onSuccess
})
