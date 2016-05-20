import storageService from '../services/storageService'
import authService from '../services/authService'

const prefs = {
  locale: storageService.get('locale') || 'en',
  theme: storageService.get('theme') || 'light'
}

const auth = {
  isAuthenticated: authService.isAuth() || false
}

export default {
  prefs,
  auth
}
