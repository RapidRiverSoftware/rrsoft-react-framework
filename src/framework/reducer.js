// @flow
import { fromJS } from 'immutable'
import createReducer from '../util/redux/createReducer'

import {
  ADD_ITEM,
  SET_ITEM
} from './actionType'

const handlers = {}

const initialState = fromJS({})

handlers[ADD_ITEM] = (state, action) => {
  const { key, value } = action
  return state.updateIn([key], arr => arr ? arr.push(value) : fromJS([value]))
}

handlers[SET_ITEM] = (state, action) => state.set(action.key, action.value)

export default createReducer(initialState, handlers)
