import storageService from '../services/storageService'

const prefs = {
  locale: storageService.get('locale') || 'en',
  theme: storageService.get('theme') || 'light'
}

export default {
  prefs
}