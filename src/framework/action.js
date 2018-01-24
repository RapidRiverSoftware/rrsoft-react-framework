// @flow

import {
  ADD_ITEM,
  SET_ITEM,
} from './actionType';

export const addItem = (key: string, value: any) => ({
  type: ADD_ITEM,
  key,
  value,
});

export const setItem = (key: string, value: any) => ({
  type: SET_ITEM,
  key,
  value,
});
