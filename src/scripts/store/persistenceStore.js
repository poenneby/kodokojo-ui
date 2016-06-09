import storageService from '../services/storage.service'

export default function persistenceHandler(next) {
  return (reducer, initialState) => {
    const store = next(reducer, initialState)

    return Object.assign({}, store, {
      dispatch(action) {
        store.dispatch(action)

        const storeState = store.getState()

        storageService.put('locale', storeState.prefs.locale)
        storageService.put('theme', storeState.prefs.theme)
        storageService.put('navigation', storeState.prefs.navigation)
        storageService.put('navigation', storeState.prefs.navigation)
        const projectConfigId = storeState.projectConfig.id
        if (projectConfigId) {
          storageService.put('projectConfigId', projectConfigId)
          const project = storeState.projectConfig.project
          if (project) {
            storageService.put('projectId', project.id)
          }
        } else {
          storageService.remove('projectConfigId')
          storageService.remove('projectId')
        }

        return action
      }
    })
  }
}
