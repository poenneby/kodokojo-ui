import { expect } from 'chai'

import authReducer from './authReducer'
import * as actions from '../../commons/constants'

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

  it('should handle ACCOUNT_ID_REQUEST', () => {
    // Given
    const state = undefined
    const action = {
      type: actions.ACCOUNT_ID_REQUEST,
      email: 'email@test.com'
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        email: 'email@test.com'
      },
      isFetching: true
    })
  })

  it('should handle ACCOUNT_ID_SUCCESS', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com'
      }
    }
    const action = {
      type: actions.ACCOUNT_ID_SUCCESS,
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
      isFetching: false
    })
  })

  it('should handle ACCOUNT_REQUEST', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com',
        id: 1
      }
    }
    const action = {
      type: actions.ACCOUNT_REQUEST
    }

    // When
    const nextState = authReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      account: {
        id: 1,
        email: 'email@test.com'
      },
      isFetching: true
    })
  })

  it('should handle ACCOUNT_REQUEST', () => {
    // Given
    const state = {
      account: {
        email: 'email@test.com',
        id: 1
      }
    }
    const action = {
      type: actions.ACCOUNT_SUCCESS,
      payload: {
        account: {
          identifier: 2,
          name: 'name',
          userName: 'userName',
          email: 'email@test.com',
          password: 'password',
          sshPublicKey: 'sshPublicKey',
          privateKey: 'privateKey'
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
      isFetching: false
    })
  })


})