// @flow

import epic from './epic'
import reducer from './reducer'
import { deleteRow } from './action'

export default {
  register(core, options, next) {
    console.log("installing crud")

    const doDeleteRow = (url, id) => {
      core.dispatch(deleteRow(url, id))
    }

    core.addReducer('crud', reducer)
    core.addEpic(epic)

    core.setFn('deleteRow', doDeleteRow)
    next()
  }
}
