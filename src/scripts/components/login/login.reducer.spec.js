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
