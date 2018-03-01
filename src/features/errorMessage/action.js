// @flow
import { DISPLAY_ERROR_MESSAGE, CLOSE_ERROR_MESSAGE } from './actionTypes';

export type DisplayErrorMessage = {|
  type: string,
  error: boolean,
  message: string,
  errorCode: string,
|};

export const displayErrorMessage = (message: string, errorCode: string): DisplayErrorMessage => ({
  type: DISPLAY_ERROR_MESSAGE,
  error: true,
  message,
  errorCode,
});

export type CloseErrorMessage = {| type: string |};

export const closeErrorMessage = (): CloseErrorMessage => ({
  type: CLOSE_ERROR_MESSAGE,
});
