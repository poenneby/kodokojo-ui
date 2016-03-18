import { browserHistory } from 'react-router'

const autService = {}

/**
 * Redirect to login page
 *
 * @returns {boolean}
 */
autService.checkAuthentication = () => {
  console.log('Fake authentication test')

  const isAuthenticated = false

  if (isAuthenticated) {
    // FIXME display page before reload, must add check on auth token in each page
    browserHistory.push('/login')
    window.location.reload()
    return false;
  }
}

autService.encryptBasicAuth = (auth) => {
  return btoa(auth)
}

autService.decryptBasicAuth = (auth) => {
  return atob(auth)
}


// public API
export const checkAuthentication = autService.checkAuthentication
export const encryptBasicAuth = autService.encryptBasicAuth
export const decryptBasicAuth = autService.decryptBasicAuth

export default autService