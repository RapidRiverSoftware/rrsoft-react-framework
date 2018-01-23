// @flow
import makeEpic from './makeEpic'
import reducer from './reducer'

export { default as LoginPage } from './LoginPage'
export { default as PrivateRoute } from './PrivateRoute'

export default {
  register(core, options, next) {
    console.log("installing auth")

    core.addEpic(makeEpic(options.url || '/login'))

    next()
  }
}
