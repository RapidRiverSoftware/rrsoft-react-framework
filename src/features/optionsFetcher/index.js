// @flow
const getTitles = (elements, titleName) => {
  const titles = Array.from(elements).map(element => ({
    label: element[titleName],
    value: element.id,
  }));
  return titles;
};

import epic from './epic'
import reducer from './reducer'
import { deleteRow } from './action'

export default {
  register(core, options, next) {
    console.log("installing crud")

    const doDeleteRow = (url, id, onSuccess) => {
      core.dispatch(deleteRow(url, id, onSuccess))
    }

    core.addReducer('crud', reducer)
    core.addEpic(epic)

    core.setFn('deleteRow', doDeleteRow)
    next()
  }
}
