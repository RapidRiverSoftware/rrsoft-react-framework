// @flow
import { fromJS } from 'immutable';

import {
  ADD_ITEM,
} from './actionTypes';

export const addItem = (key: string, value: any) => ({
  type: ADD_ITEM,
  key,
  value,
});
