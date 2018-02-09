// @flow

import {
  DELETE_ROW,
} from './actionType';

export const deleteRow = (id, onSuccess) => ({
  type: DELETE_ROW,
  id,
  onSuccess
});
