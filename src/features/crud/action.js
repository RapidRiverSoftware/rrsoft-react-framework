// @flow

import {
  SAVE_EDIT,
  EDIT_FORM,
  RESET_DATA
} from './actionType';

export const saveEdit = (url, data, onSuccess) => ({
  type: SAVE_EDIT,
  url,
  data,
  onSuccess
});

export const editForm = (url, id) => ({
  type: EDIT_FORM,
  url,
  id
});

export const resetData = (url) => ({
  type: RESET_DATA,
  url,
});
