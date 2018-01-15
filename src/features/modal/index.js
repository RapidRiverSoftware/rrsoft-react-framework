// @flow
import reducer from './reducer'

export default {
  register(core, options, next) {
    console.log("installing modal")

    core.addReducer('modal', reducer)

    next()
  }
}

export { Modal, connectModal } from './Modal'
