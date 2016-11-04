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

import api from './api.versions'

export default {
  brick: `${api.v1}/brick`,
  event: `${api.v1}/event`,
  project: `${api.v1}/project`,
  projectConfig: `${api.v1}/projectconfig`,
  projectConfigUser: '/user',
  user: `${api.v1}/user`,
  version: `${api.v1}`
}
