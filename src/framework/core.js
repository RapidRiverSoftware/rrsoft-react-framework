import configureStore from './configureStore'
import createHistory from 'history/createBrowserHistory'
import { combineReducers } from 'redux-immutable'
import { Map } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { addItem } from './actions'
import each from 'lodash/each'
import coreReducer from './reducer'

const featureConfigs = []
const reducers = {}
const dispatchQueue = []
let isStarted = false

let installCount = -1

const core = {
  // bootstraping for apps
  addReducer(name, reducer) {
    reducers[name] = reducer
  },


  // install feature
  install(feature, options = {}) {
    featureConfigs.push({register: feature.register, options})
    // console.log(feature)
  },


  addItem(key, value) {
    if (isStarted) {
      this.store.dispatch(addItem(key, value))
    } else {
      dispatchQueue.push(addItem(key, value))
    }
  },


  // start the app
  start(App, rootNode) {
    const next = () => {
      installCount += 1
      const featureConfig = featureConfigs[installCount]
      this.addReducer('core', coreReducer)

      if (featureConfig) {
        const register = featureConfig.register
        register(this, featureConfig.options, next)
      } else {
        const history = createHistory();
        this.store = configureStore(combineReducers(reducers), function(){}, Map({}), history);
        ReactDOM.render(<App />, rootNode);
        isStarted = true
        each(dispatchQueue, action => this.store.dispatch(action))
        console.log("finish installing")
      }
    }

    installCount = -1

    next()
  }
}

export default core
