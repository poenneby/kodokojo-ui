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

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_RESET
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

// FIXME is this reducer necessary?
export default function login(state = initialState, action) {
  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === AUTH_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === AUTH_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === AUTH_RESET) {
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}
