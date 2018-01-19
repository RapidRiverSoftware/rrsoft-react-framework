// @flow
import { fromJS } from 'immutable';

import {
  ADD_ITEM,
} from './actionType';

export const addItem = (key: string, value: any) => ({
  type: ADD_ITEM,
  key,
  value,
});
