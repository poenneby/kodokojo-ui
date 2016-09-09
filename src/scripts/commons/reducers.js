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

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from '../components/auth/auth.reducer.js'
import bricks from '../components/brick/brick.reducer.js'
import menu from '../components/menu/menu.reducer'
import prefs from '../components/app/app.reducer'
import projectConfig from '../components/projectConfig/projectConfig.reducer'
import socket from '../components/_utils/websocket/websocket.reducer'
import users from '../components/user/user.reducer'

const rootReducer = combineReducers({
  auth,
  bricks,
  menu,
  prefs,
  projectConfig,
  socket,
  users,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
