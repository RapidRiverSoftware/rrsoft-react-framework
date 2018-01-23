// @flow
import AppContainer from './AppContainer'

export default {
  register(core, options, next) {
    console.log("installing admin app")
    core.setDefaultApp(AppContainer, { jsLoginUrl: options.jsLoginUrl || '/login' })
    next()
  }
}
