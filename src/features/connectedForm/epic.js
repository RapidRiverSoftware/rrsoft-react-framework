// @flow
import core from '../../framework/core'

import {
  EDIT_FORM,
  EDIT_FORM_SUCCESS,
  SAVE_EDIT,
  SAVE_EDIT_SUCCESS,
} from './actionType'

const fetchListEpic = (action$: any, store: any) =>
  action$
    .ofType(EDIT_FORM)
    .mergeMap(action => core.api.get(`${action.url}/${action.id}`, {}, { action }))
    .map(core.api.responseToAction(EDIT_FORM_SUCCESS))

const saveEditEpic = (action$: any, store: any) =>
  action$
    .ofType(SAVE_EDIT)
    .mergeMap(action => core.api.put(`${action.url}/${action.data.id}`, action.data, { action }))
    .map(core.api.responseToAction(SAVE_EDIT_SUCCESS))

export default [
  fetchListEpic,
  saveEditEpic
]
