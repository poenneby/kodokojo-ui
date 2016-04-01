import storageService from './storageService'

const authService = {}

/**
 * Check auth & redirect to login page
 *
 * @returns {boolean}
 */
authService.checkAuth = (nextState, replaceState) => {
  const isAuthenticated = authService.isAuth()

  if (!isAuthenticated) {
    // use react router onEnter callback argument to replace router state
    replaceState({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  return isAuthenticated
}

/**
 * Return encrypted authentication
 *
 * @param login
 * @param password
 * @returns {string}
 */
authService.getAuth = (login, password) => {
  const token = authService._encryptBasicAuth(`${login}:${password}`)
  storageService.put('token', token, 'session')
  return token
}


/**
 * Set user id & isAuthenticated
 *
 * @param id
 */
authService.setAuth = (id) => {
  storageService.put('isAuthenticated', true, 'session')
  storageService.put('userId', id, 'session')
}

/**
 * Reset authentication
 */
authService.resetAuth = () => {
  storageService.remove('isAuthenticated', 'session')
  storageService.remove('userId', 'session')
  storageService.remove('token', 'session')
}

/**
 * Return authenticated state
 *
 * @returns {boolean}
 */
authService.isAuth = () => {
  return !!storageService.get('isAuthenticated', 'session')
}

/**
 * Return encrypted basic auth string
 *
 * @param auth
 * @returns {string}
 * @private
 */
authService._encryptBasicAuth = (auth) => {
  return btoa(auth)
}

/**
 * Return decrypted basic auth string
 *
 * @param auth
 * @returns {string}
 * @private
 */
authService._decryptBasicAuth = (auth) => {
  return atob(auth)
}


// public API
export const checkAuth = authService.checkAuth
export const setAuth = authService.setAuth
export const resetAuth = authService.resetAuth
export const isAuth = authService.isAuth

export default authService