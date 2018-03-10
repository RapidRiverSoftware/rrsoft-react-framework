// @flow
// import reducer from './reducer'
import ConnectedDatagrid from './ConnectedDatagrid'
import epic from './epic'
import reducer from './reducer'
import { fetchList } from './action'

export default {
  register(core, options, next) {
    console.log("installing connected datagrid")

    const refreshFetch = (url) => {
      const currentPage = core.store.getState().getIn(['connectedDatagrid', 'lastFetched', url, 'currentPage'])
      const searchFields = core.store.getState().getIn(['connectedDatagrid', 'lastFetched', url, 'searchFields'])
      core.dispatch(fetchList(url, currentPage, searchFields))
    }

    core.setFn('refreshFetch', refreshFetch)
    core.addReducer('connectedDatagrid', reducer)
    core.addEpic(epic)
    core.setComponent('ConnectedDatagrid', ConnectedDatagrid, "connectedDatagrid")
    next()
  }
}
