// @flow

import {
  FETCH_LIST,
} from './actionType';

export const fetchList = (url, name, currentPage) => ({
  type: FETCH_LIST,
  url,
  name,
  currentPage
});
