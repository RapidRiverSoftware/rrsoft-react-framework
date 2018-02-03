// @flow
// import reducer from './reducer'
import ConnectedDatagrid from './ConnectedDatagrid'
import epic from './epic'
import reducer from './reducer'

export default {
  register(core, options, next) {
    console.log("installing connected datagrid")
    core.addReducer('connectedDatagrid', reducer)
    core.addEpic(epic)
    core.setComponent('ConnectedDatagrid', ConnectedDatagrid, "connectedDatagrid")
    next()
  }
}
