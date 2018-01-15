// @flow

import {
  FETCH_SUGGESTION,
  FETCH_OPTION,
} from './actionType';

export const fetchSuggestion = (data) => {
  return {
    type: FETCH_SUGGESTION,
    data,
  }
};

export const fetchOption = (url) => {
  return {
    type: FETCH_OPTION,
    url,
  }
};
