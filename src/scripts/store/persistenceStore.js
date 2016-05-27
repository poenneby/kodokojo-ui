import storageService from '../services/storageService'

export default function persistenceHandler(next) {
  return (reducer, initialState) => {
    const store = next(reducer, initialState)

    return Object.assign({}, store, {
      dispatch(action) {
        store.dispatch(action)

        storageService.put('locale', store.getState().prefs.locale)
        storageService.put('theme', store.getState().prefs.theme)
        storageService.put('navigation', store.getState().prefs.navigation)

        return action
      }
    })
  }
}
