// @flow

import {
  SAVE_EDIT,
  EDIT_FORM,
} from './actionType';

export const saveEdit = (url, id, data) => ({
  type: SAVE_EDIT,
  url,
  data,
});

export const editForm = (url, id) => ({
  type: EDIT_FORM,
  url,
  id
});
