// @flow
import epic from './epic'
import reducer from './reducer'

export {default as TextField} from './TextField'
export {default as TagInputField} from './TagInputField'
export {default as DisplayOnlyField} from './DisplayOnlyField'

export default {
  register(core, options, next) {
    console.log("installing form")
    core.addReducer('featuresForm', reducer)
    core.addEpic(epic)

    next()
  }
}
