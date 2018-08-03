// @flow

import epic from './epic'
import reducer from './reducer'
import { showRow, deleteRow } from './action'

export default {
  register(core, options, next) {
    console.log("installing crud")

    const doDeleteRow = (url, id, onSuccess) => {
      core.dispatch(deleteRow(url, id, onSuccess))
    }

    const doShowRow = (url, row, ridx, onSuccess) => {
      core.dispatch(showRow(url, row, ridx, onSuccess))
    }

    core.addReducer('crud', reducer)
    core.addEpic(epic)

    core.setFn('deleteRow', doDeleteRow)
    core.setFn('showRow', doShowRow)
    next()
  }
}
