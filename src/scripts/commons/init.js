import storageService from '../services/storage.service'
import authService from '../services/auth.service'

const prefs = {
  locale: storageService.get('locale') || 'en',
  theme: storageService.get('theme') || 'light'
}

const auth = {
  isAuthenticated: authService.isAuth() || false
}
if (auth.isAuthenticated) {
  auth.account = authService.getAccount()
}

const projectConfigId = storageService.get('projectConfigId')
const projectConfig = projectConfigId && projectConfigId !== 'null' ? {
  id: projectConfigId
} : {}

const project = {
  id: storageService.get('projectId')
}

if (project.id) {
  projectConfig.project = project
}

export default {
  prefs,
  auth,
  projectConfig
}
