// @flow
import AppContainer from './AppContainer'
import auth from '../auth'
import modal from '../modal'
import form from '../form'
import reducer from './reducer'

export default {
  register(core, options, next) {
    console.log("installing admin app")
    core.install(auth)
    core.install(modal)
    core.install(form)
    core.setDefaultApp(AppContainer, { jsLoginUrl: options.jsLoginUrl || '/login' })
    core.addReducer('adminApp', reducer)
    core.setItem('successLoginUrl', options.successLoginUrl)
    core.setItem('logo', options.logo)
    next()
  }
}
