// @flow

import {
  FETCH_LIST,
} from './actionType';

export const fetchList = (url, currentPage, searchFields) => ({
  type: FETCH_LIST,
  url,
  currentPage,
  searchFields
});
