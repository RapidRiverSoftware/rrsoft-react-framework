// @flow

import {
  SAVE_EDIT,
  SAVE_ADD,
  EDIT_FORM,
  RESET_DATA,
  RESET_LOCAL_DATA,
  ADD_FORM
} from './actionType';

export const saveEdit = (url, data, onSuccess) => ({
  type: SAVE_EDIT,
  url,
  data,
  onSuccess
});

export const saveAdd = (url, data, onSuccess) => ({
  type: SAVE_ADD,
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

export const addForm = (url) => ({
  type: ADD_FORM,
  url,
});

export const resetLocalData = (id) => ({
  type: RESET_LOCAL_DATA,
  id,
});

