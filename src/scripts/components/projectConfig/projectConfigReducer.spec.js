import { expect } from 'chai'

import projectConfigReducer from './projectConfigReducer'
import * as ActionsTypes from '../../commons/constants'

describe('projectConfig reducer', () => {

  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = projectConfigReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: false
    })
  })

  it('should handle PROJECT_CONFIG_REQUEST', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.PROJECT_CONFIG_REQUEST
    }

    // When
    const nextState = projectConfigReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      isFetching: true
    })
  })  

  it('should handle PROJECT_CONFIG_SUCCESS', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.PROJECT_CONFIG_SUCCESS,
      payload: {
        projectConfig: {
          id: 'projectId'
        }
      }
    }

    // When
    const nextState = projectConfigReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      id: 'projectId',
      isFetching: false
    })
  })
})
