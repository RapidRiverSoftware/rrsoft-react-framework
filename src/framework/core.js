import configureStore from './configureStore'
import createHistory from 'history/createBrowserHistory'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { fromJS } from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import each from 'lodash/each'
import isArray from 'lodash/isArray'

import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';


import { addItem, setItem } from './action'
import coreReducer from './reducer'
import { makeApi } from '../util/api'
import { makeStorage } from '../util/storage'

const featureConfigs = []
const reducers = {}
const epics = []
const dispatchQueue = []
const config = {}

let initialState = {}
let defaultAppOptions = {}
let apiOptions = {
  startPath: '/api',
}
let isStarted = false
let DefaultApp = null
let installCount = -1

const getApiOptions = () => apiOptions;

const core = {
  addReducer(name, reducer) {
    reducers[name] = reducer
  },


  addEpic(epic) {
    if (isArray(epic)) {
      epics.push(...epic)
    } else {
      epics.push(epic)
    }
  },


  // install feature
  install(feature, options = {}) {
    featureConfigs.push({ register: feature.register, options })
  },


  set(name, value) {
    config[name] = value
  },

  get(name) {
    return config[name]
  },


  addItem(key, value) {
    if (isStarted) {
      this.store.dispatch(addItem(key, value))
    } else {
      dispatchQueue.push(addItem(key, value))
    }
  },

  setItem(key, value) {
    if (isStarted) {
      this.store.dispatch(setItem(key, value))
    } else {
      dispatchQueue.push(setItem(key, value))
    }
  },

  dispatch(action) {
    this.store.dispatch(action)
  },


  setDefaultApp(App, options = {}) {
    DefaultApp = App
    defaultAppOptions = options
  },


  setApiOptions(options = {}) {
    apiOptions = options
  },

  setState(state) {
    initialState = { ...initialState, ...state }
  },

  api: makeApi(getApiOptions),
  storage: makeStorage(),

  // start the app
  start(rootNode) {
    const next = () => {
      installCount += 1
      const featureConfig = featureConfigs[installCount]
      this.addReducer('core', coreReducer)

      if (featureConfig) {
        const register = featureConfig.register
        register(this, featureConfig.options, next)
      } else {
        const history = createHistory();

        this.store = configureStore(combineReducers(reducers), combineEpics(...epics), fromJS(initialState), history)

        ReactDOM.render(<DefaultApp {...defaultAppOptions} store={this.store} />, rootNode)
        isStarted = true
        each(dispatchQueue, action => this.store.dispatch(action))
        console.log("finish installing")
      }
    }

    installCount = -1
    this.addReducer('routing', routerReducer)
    this.addReducer('form', formReducer)

    next()
  }
}

window.rrcore = core

export default core
