import cookie from 'js-cookie'

export default {
  name: () => {
  },
  loggedIn: () => cookie.get('authToken')
}
