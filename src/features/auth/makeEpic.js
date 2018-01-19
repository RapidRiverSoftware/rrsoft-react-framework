// @flow

const makeEpic = (url) => {
  const pingEpic = action$ =>
    action$
      .filter(action => action.type === 'PING')
      .mapTo({ type: url });
      
  return pingEpic
}

export default makeEpic
