// @flow

import {
  DELETE_ROW,
} from './actionType';

export const deleteRow = (url, id, onSuccess) => ({
  type: DELETE_ROW,
  url,
  id,
  onSuccess
});
