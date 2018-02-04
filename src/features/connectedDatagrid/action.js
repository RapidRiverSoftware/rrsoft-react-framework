// @flow

import {
  FETCH_LIST,
} from './actionType';

export const fetchList = (url, currentPage) => ({
  type: FETCH_LIST,
  url,
  currentPage
});
