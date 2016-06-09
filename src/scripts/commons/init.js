import storageService from '../services/storage.service'
import authService from '../services/auth.service'

const prefs = {
  locale: storageService.get('locale') || 'en',
  theme: storageService.get('theme') || 'light'
}

const auth = {
  isAuthenticated: authService.isAuth() || false
}

const projectConfig = {
  id: storageService.get('projectConfigId')
}

export default {
  prefs,
  auth,
  projectConfig
}
