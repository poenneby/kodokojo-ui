import storageService from './storageService'

const authService = {}

/**
 * Check auth & redirect to login page
 *
 * @param nextState
 * @param replaceState
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
 * @returns {string} tokenize auth
 */
authService.setAuth = (login, password) => {
  if (login && password) {
    const token = authService._encryptBasicAuth(`${login}:${password}`)
    storageService.put('token', token, 'session')
    return token
  }
}

/**
 * Put authentication
 *
 * @param id {string} user identifier
 */
authService.putAuth = (id) => {
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
 * Return token
 *
 * @returns {string} token
 */
authService.getToken = () => {
  return storageService.get('token', 'session') || ''
}

/**
 * Return encrypted basic auth string
 *
 * @param auth {string}
 * @returns {string}
 * @private
 */
authService._encryptBasicAuth = (auth) => {
  return btoa(auth)
}

/**
 * Return decrypted basic auth string
 *
 * @param auth {string}
 * @returns {string}
 * @private
 */
authService._decryptBasicAuth = (auth) => {
  return atob(auth)
}

// public API
export const checkAuth = authService.checkAuth
export const setAuth = authService.setAuth
export const putAuth = authService.putAuth
export const resetAuth = authService.resetAuth
export const isAuth = authService.isAuth
export const getToken = authService.getToken

// service
export default authService