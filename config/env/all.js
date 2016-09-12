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

import api from '../shared/api.endpoints'

/**
 * Set docker host
 */
let localApiHost
const dockerHost = process.env.DOCKER_HOST

if (!dockerHost && !process.env.API_ENV || dockerHost.match(/unix:\/\//)) {
  localApiHost = 'http://localhost'
}

if (dockerHost.match(/^tcp:\/\//)) {
  localApiHost = `http://${dockerHost.match(/^tcp:\/\/([\d|.]*):\d*/)[1]}`
}

if (process.env.API_ENV) {
  localApiHost = `https://${process.env.API_ENV}`
}

// TODO set protocol into parameter to serve https or http or ws
const all = {
  api: {
    host: localApiHost,
    routes: {
      brick: `${api.brick}`,
      event: `${api.event}`,
      projectConfig: `${api.projectConfig}`,
      project: `${api.project}`,
      user: `${api.user}`
    }
  }
}

export default all
