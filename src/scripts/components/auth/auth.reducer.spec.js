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

import authReducer from './auth.reducer'
import * as ActionsTypes from '../../commons/constants'

describe('auth reducer', () => {
  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {},
      isFetching: false
    })
  })

  it('should handle ACCOUNT_NEW_ID_REQUEST', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_ID_REQUEST,
      payload: {
        email: 'email@test.com'
      }
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        email: 'email@test.com'
      },
      isAuthenticated: false,
      isFetching: true
    })
  })

  it('should handle ACCOUNT_NEW_ID_SUCCESS', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com'
      }
    }
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_ID_SUCCESS,
      payload: {
        account: {
          id: 1
        }
      }
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        id: 1,
        email: 'email@test.com'
      },
      isAuthenticated: false,
      isFetching: false
    })
  })

  it('should handle ACCOUNT_NEW_REQUEST', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com',
        id: 1
      }
    }
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_REQUEST
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        id: 1,
        email: 'email@test.com'
      },
      isAuthenticated: false,
      isFetching: true
    })
  })

  it('should handle ACCOUNT_NEW_SUCCESS', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com',
        id: 1
      }
    }
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_SUCCESS,
      payload: {
        account: {
          id: 2,
          name: 'name',
          userName: 'userName',
          email: 'email@test.com',
          password: 'password',
          sshKeyPublic: 'sshPublicKey',
          sshKeyPrivate: 'privateKey'
        }
      }
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        id: 2,
        name: 'name',
        userName: 'userName',
        email: 'email@test.com',
        password: 'password',
        sshKeyPublic: 'sshPublicKey',
        sshKeyPrivate: 'privateKey'
      },
      isAuthenticated: true,
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
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {},
      isAuthenticated: false,
      isFetching: true
    })
  })

  it('should handle AUTH_SUCCESS', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com',
        id: 1
      }
    }
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
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        id: 2,
        name: 'name',
        userName: 'userName',
        email: 'email@test.com',
        password: '',
        sshKeyPublic: '',
        sshKeyPrivate: ''
      },
      isAuthenticated: true,
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
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {},
      isAuthenticated: false,
      isFetching: false
    })
  })
})
