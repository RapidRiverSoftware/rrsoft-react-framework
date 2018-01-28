// @flow

import {
  FETCH_SUGGESTION,
} from './actionType';

export const fetchSuggestion = (data) => {
  return {
    type: FETCH_SUGGESTION,
    data,
  }
};
