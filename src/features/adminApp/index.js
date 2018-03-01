// @flow
import AppContainer from './AppContainer'
import auth from '../auth'
import modal from '../modal'
import form from '../form'
import connectedDatagrid from '../connectedDatagrid'
import connectedForm from '../connectedForm'
import errorMessage from '../errorMessage'
import crud from '../crud'
import reducer from './reducer'

export default {
  register(core, options, next) {
    console.log("installing admin app")
    core.install(auth)
    core.install(modal)
    core.install(form)
    core.install(connectedDatagrid)
    core.install(connectedForm)
    core.install(crud)
    core.install(errorMessage)

    core.setDefaultApp(AppContainer)
    core.addReducer('adminApp', reducer)
    core.setItem('successLoginUrl', options.successLoginUrl)
    core.setItem('logo', options.logo)
    next()
  }
}
