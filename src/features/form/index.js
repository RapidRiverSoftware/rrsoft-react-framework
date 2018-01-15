// @flow
import epic from './epic'
import reducer from './reducer'
import { fetchOption } from './action'

export {default as TextField} from './TextField'
export {default as CompactTextField} from './CompactTextField'
export {default as TagInputField} from './TagInputField'
export {default as DisplayOnlyField} from './DisplayOnlyField'
export {default as SelectField} from './SelectField'
export {default as ChooseField} from './ChooseField'


export default {
  register(core, options, next) {
    const doFetchOption = (url) => {
      core.dispatch(fetchOption(url))
    }

    console.log("installing form")
    core.addReducer('featuresForm', reducer)
    core.addEpic(epic)
    core.setFn('fetchOption', doFetchOption)

    next()
  }
}
