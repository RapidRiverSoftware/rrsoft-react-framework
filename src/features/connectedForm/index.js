// @flow
// import reducer from './reducer'
import ConnectedForm from './ConnectedForm'
import ConnectedLocalForm from './ConnectedLocalForm'
import ConnectedEditForm from './ConnectedEditForm'
import ConnectedAddForm from './ConnectedAddForm'
import epic from './epic'
import reducer from './reducer'
import { editForm, addForm } from './action'

export default {
  register(core, options, next) {
    const doEditForm = (url, id) => {
      core.dispatch(editForm(url, id))
    }

    const doAddForm = (url) => {
      core.dispatch(addForm(url))
    }

    console.log("installing connected form")
    core.addReducer('connectedForm', reducer)
    core.addEpic(epic)
    core.setComponent('ConnectedForm', ConnectedForm, "connectedForm")
    core.setComponent('ConnectedEditForm', ConnectedEditForm, "connectedForm")
    core.setComponent('ConnectedLocalForm', ConnectedLocalForm, "connectedLocalForm")
    core.setComponent('ConnectedAddForm', ConnectedAddForm, "connectedAddForm")
    core.setFn('editForm', doEditForm)
    core.setFn('addForm', doAddForm)
    next()
  }
}
