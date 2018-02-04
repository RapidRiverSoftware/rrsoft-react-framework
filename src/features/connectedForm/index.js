// @flow
// import reducer from './reducer'
import ConnectedForm from './ConnectedForm'
import epic from './epic'
import reducer from './reducer'

export default {
  register(core, options, next) {
    console.log("installing connected form")
    core.addReducer('connectedForm', reducer)
    core.addEpic(epic)
    core.setComponent('ConnectedForm', ConnectedForm, "connectedForm")
    next()
  }
}
