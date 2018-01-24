// @flow

import {
  LOGIN,
  LOGOUT,
} from './actionType';

type Node = any;

export const login = (data) => ({
  type: LOGIN,
  data,
});
