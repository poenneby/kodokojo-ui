const storageService = {}

storageService.put = (key, value, scope = 'local') => {
  return window[`${scope}Storage`].setItem(key, value)
}

storageService.get = (key, value, scope = 'local') => {
  return window[`${scope}Storage`].getItem(key, value)
}

storageService.remove = (key, value, scope = 'local') => {
  return window[`${scope}Storage`].removeItem(key, value)
}

storageService.clear = (scope = 'local') => {
  return window[`${scope}Storage`].clear()
}

// public API
export const put = storageService.put
export const get = storageService.get
export const remove = storageService.remove
export const clear = storageService.clear

export default storageService
