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


import { addItem } from './action'
import coreReducer from './reducer'

const featureConfigs = []
const reducers = {}
const epics = []
const dispatchQueue = []
const config = {}

let initialState = {}
let defaultAppOptions = {}
let isStarted = false
let DefaultApp = null
let installCount = -1

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


  dispatch(action) {
    this.store.dispatch(action)
  },


  setDefaultApp(App, options = {}) {
    DefaultApp = App
    defaultAppOptions = options
  },


  setState(state) {
    initialState = { ...initialState, ...state }
  },


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
        ReactDOM.render(<DefaultApp {... defaultAppOptions} store={this.store} />, rootNode)
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
