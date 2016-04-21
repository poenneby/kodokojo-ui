import { PROJECT_CONFIG_REQUEST, PROJECT_CONFIG_SUCCESS, PROJECT_CONFIG_FAILURE } from '../../commons/constants'

const initialState = {
  projectConfig: {},
  isFetching: false
}

export default function project(state = initialState, action) {
  if (action.type === PROJECT_CONFIG_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }

  if (action.type === PROJECT_CONFIG_SUCCESS) {
    return {
      ...state,
      project: {
        id: action.payload.project.id
      },
      isFetching: false
    }
  }

  if (action.type === PROJECT_CONFIG_FAILURE) {
    // TODO
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}