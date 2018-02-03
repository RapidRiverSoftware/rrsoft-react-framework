// @flow

import {
  FETCH_LIST,
} from './actionType';

export const fetchList = (url, name) => ({
  type: FETCH_LIST,
  url,
  name
});
