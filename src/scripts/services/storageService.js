// TODO test scope value, set it to locale if other than session por locale
const storageService = {}

storageService.put = (key, value, scope = 'local') => window[`${scope}Storage`].setItem(key, value)

storageService.get = (key, scope = 'local') => window[`${scope}Storage`].getItem(key)

storageService.remove = (key, scope = 'local') => window[`${scope}Storage`].removeItem(key)

storageService.clear = (scope = 'local') => window[`${scope}Storage`].clear()

// public API
export const put = storageService.put
export const get = storageService.get
export const remove = storageService.remove
export const clear = storageService.clear

export default storageService
