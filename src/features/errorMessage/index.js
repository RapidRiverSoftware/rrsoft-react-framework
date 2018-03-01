// @flow

import reducer from './reducer'
import { displayErrorMessage } from './action'

export default {
  register(core, options, next) {
    console.log("installing errorMessage")

    const doDisplayErrorMessage = (message) => {
      core.dispatch(displayErrorMessage(message))
    }

    core.addReducer('errorMessage', reducer)

    core.setFn('displayErrorMessage', doDisplayErrorMessage)
    next()
  }
}
