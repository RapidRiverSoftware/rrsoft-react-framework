// @flow
import { OPEN_MODAL, CLOSE_MODAL } from './actionType';

export const openModal = (id: string) => ({
  type: OPEN_MODAL,
  id,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
