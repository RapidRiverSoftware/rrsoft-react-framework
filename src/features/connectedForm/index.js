// @flow
// import reducer from './reducer'
import ConnectedForm from './ConnectedForm'
import ConnectedEditForm from './ConnectedEditForm'
import epic from './epic'
import reducer from './reducer'
import { editForm } from './action'

export default {
  register(core, options, next) {
    const doEditForm = (url, id) => {
      core.setItem('editingId', id)
      core.dispatch(editForm(url, id))
    }

    console.log("installing connected form")
    core.addReducer('connectedForm', reducer)
    core.addEpic(epic)
    core.setComponent('ConnectedForm', ConnectedForm, "connectedForm")
    core.setComponent('ConnectedEditForm', ConnectedEditForm, "connectedForm")
    core.setComponent('ConnectedAddForm', ConnectedEditForm, "connectedAddForm")
    core.setFn('editForm', doEditForm)
    next()
  }
}
