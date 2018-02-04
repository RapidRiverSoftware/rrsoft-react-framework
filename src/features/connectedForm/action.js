// @flow

import {
  FETCH_EDIT,
  EDIT_FORM,
} from './actionType';

export const fetchEdit = (url, name, currentPage) => ({
  type: FETCH_EDIT,
  url,
  name,
  currentPage
});

export const editForm = (url, name, id) => ({
  type: EDIT_FORM,
  url,
  name,
  currentPage
});
