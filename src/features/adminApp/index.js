// @flow
import AppContainer from './AppContainer'
import auth from '../auth'

export default {
  register(core, options, next) {
    console.log("installing admin app")
    core.install(auth)
    core.setDefaultApp(AppContainer, { jsLoginUrl: options.jsLoginUrl || '/login' })
    core.setItem('successLoginUrl', options.successLoginUrl)
    core.setItem('logo', options.logo)
    next()
  }
}
