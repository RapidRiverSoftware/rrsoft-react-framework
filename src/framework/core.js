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
const components = {}
const fns = {}

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
    if (!reducer) {
      throw new Error("no reducer defined")
    }

    if(reducers[name]) {
      throw new Error(`reducer: [${name}] has been added before`)
    }

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

  setComponent(name, component, source = "unknown") {
    if (components[name]) {
      throw new Error(`component has been defined before from feature[${source}]`)
    }

    components[name] = { component, source }
  },

  component(name) {
    if (!components[name]) {
      throw new Error(`component: [${name}] is not defined`)
    }
    return components[name].component
  },

  setFn(name, fn, source = "unknown") {
    if (fns[name]) {
      throw new Error(`function has been defined before from feature[${source}]`)
    }

    fns[name] = { fn, source }
  },

  fn(name) {
    if (!fns[name]) {
      throw new Error(`fn: [${name}] is not defined`)
    }
    return fns[name].fn
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

      if (featureConfig) {
        const register = featureConfig.register
        register(this, featureConfig.options, next)
      } else {
        const history = createHistory();

        this.store = configureStore(combineReducers(reducers), combineEpics(...epics), fromJS(initialState), history)

        ReactDOM.render(<DefaultApp {...defaultAppOptions} store={this.store} />, rootNode)
        isStarted = true
        each(dispatchQueue, action => {
          console.log(action)
          this.store.dispatch(action)
        })
        console.log("finish installing")
      }
    }

    installCount = -1

    this.addReducer('core', coreReducer)
    this.addReducer('reactRoute', routerReducer)
    this.addReducer('form', formReducer)

    next()
  }
}

const Redirect = ({ to }) => {
  let redirectUrl;
  if (typeof to === 'object') {
    redirectUrl = to.pathname
  } else {
    redirectUrl = to
  }

  document.location.replace(redirectUrl)

  return null
}
core.Redirect = Redirect;


window.rrcore = core

export default core
