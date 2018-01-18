// @flow
import App from './App'

export default {
  register(core, options, next) {
    console.log("installing admin app")
    core.setDefaultApp(App)
    next()
  }
}
