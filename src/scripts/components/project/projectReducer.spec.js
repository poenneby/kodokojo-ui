import { expect } from 'chai'

import projectReducer from './projectReducer'
import * as ActionsTypes from '../../commons/constants'

describe('project reducer', () => {

  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      project: {},
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
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      project: {},
      isFetching: true
    })
  })  

  it('should handle PROJECT_CONFIG_SUCCESS', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.PROJECT_CONFIG_SUCCESS,
      payload: {
        project: {
          id: 'projectId'
        }
      }
    }

    // When
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      project: {
        id: 'projectId'
      },
      isFetching: false
    })
  })
})
