/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import storageService from '../services/storage.service'
import authService from '../services/auth.service'

const prefs = {
  locale: storageService.get('locale') || 'en',
  theme: storageService.get('theme') || 'light'
}

const auth = {
  isAuthenticated: authService.isAuth() || false,
  isFetching: false
}
if (auth.isAuthenticated) {
  auth.account = authService.getAccount()
}

const projectConfigId = storageService.get('projectConfigId')
const projectConfig = projectConfigId && projectConfigId !== 'null' ? {
  id: projectConfigId,
  isFetching: false
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
