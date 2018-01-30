// @flow
import { OPEN_MENU, CLOSE_MENU } from './actionType';

export const openMenu = (id: string) => ({
  type: OPEN_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});
