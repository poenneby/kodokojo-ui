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

/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import { expect } from 'chai'

import loginReducer from './login.reducer'
import * as ActionsTypes from '../../commons/constants'

describe('login reducer', () => {
  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = loginReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })

  it('should handle AUTH_REQUEST', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.AUTH_REQUEST,
      payload: {
        email: 'email@test.com'
      }
    }

    // When
    const nextState = loginReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: true
    })
  })

  it('should handle AUTH_SUCCESS', () => {
    // Given
    const state = {}
    const action = {
      type: ActionsTypes.AUTH_SUCCESS,
      payload: {
        account: {
          id: 2,
          name: 'name',
          userName: 'userName',
          email: 'email@test.com',
          password: '',
          sshKeyPublic: '',
          sshKeyPrivate: ''
        }
      }
    }

    // When
    const nextState = loginReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })

  it('should handle AUTH_FAILURE', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.AUTH_FAILURE,
      payload: {}
    }

    // When
    const nextState = loginReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })
})
