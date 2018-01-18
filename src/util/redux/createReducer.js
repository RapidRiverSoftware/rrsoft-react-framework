// @flow
export default function createReducer(initialState: any, handlers: Object) {
  return function reducer(state: any = initialState, action: Object) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
