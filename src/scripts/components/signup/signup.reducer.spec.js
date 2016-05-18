import { expect } from 'chai'

import signupReducer from './signup.reducer'
import * as ActionsTypes from '../../commons/constants'

describe('signup reducer', () => {

  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = signupReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
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
    const nextState = signupReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: true
    })
  })

  it('should handle ACCOUNT_NEW_ID_SUCCESS', () => {
    // Given
    const state = {}
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_ID_SUCCESS,
      payload: {
        account: {
          id: 1
        }
      }
    }

    // When
    const nextState = signupReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })

  it('should handle ACCOUNT_NEW_REQUEST', () => {
    // Given
    const state = {}
    const action = {
      type: ActionsTypes.ACCOUNT_NEW_REQUEST
    }

    // When
    const nextState = signupReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: true
    })
  })

  it('should handle ACCOUNT_NEW_SUCCESS', () => {
    // Given
    const state = {}
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
    const nextState = signupReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })
})
