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
  ACCOUNT_NEW_ID_REQUEST,
  ACCOUNT_NEW_ID_SUCCESS,
  ACCOUNT_NEW_ID_FAILURE,
  ACCOUNT_NEW_REQUEST,
  ACCOUNT_NEW_SUCCESS,
  ACCOUNT_NEW_FAILURE
} from '../../commons/constants'

const initialState = {
  isFetching: false
}

// FIXME is this reducer necessary?
export default function signup(state = initialState, action) {
  if (action.type === ACCOUNT_NEW_ID_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === ACCOUNT_NEW_ID_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_ID_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === ACCOUNT_NEW_SUCCESS) {
    return {
      ...state,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_FAILURE) {
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}
