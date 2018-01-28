import cookie from 'js-cookie'

export default (options = {}) => ({
  set: (key, value, expires=365) => cookie.set(key, value, { expires }),
  get: key => cookie.get(key),
  remove: key => cookie.remove(key)
})
