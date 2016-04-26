import merge from 'lodash/merge'
import {
  ACCOUNT_NEW_ID_REQUEST,
  ACCOUNT_NEW_ID_SUCCESS,
  ACCOUNT_NEW_ID_FAILURE,
  ACCOUNT_NEW_REQUEST,
  ACCOUNT_NEW_SUCCESS,
  ACCOUNT_NEW_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_RESET
} from '../../commons/constants'

const initialState = {
  account: {},
  isFetching: false
}

export default function auth(state = initialState, action) {
  if (action.type === ACCOUNT_NEW_ID_REQUEST) {
    return {
      ...state,
      account: {
        email: action.payload.email
      },
      isAuthenticated: false,
      isFetching: true
    }
  }

  if (action.type === ACCOUNT_NEW_ID_SUCCESS) {
    return merge(
      {},
      state,
      {
        account: {
          id: action.payload.account.id
        },
        isAuthenticated: false,
        isFetching: false
      }
    )
  }

  if (action.type === ACCOUNT_NEW_ID_FAILURE) {
    // TODO
    return {
      ...state,
      isAuthenticated: false,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_REQUEST) {
    return {
      ...state,
      isAuthenticated: false,
      isFetching: true
    }
  }

  // TODO delete password / sshKeys from state after rendering
  if (action.type === ACCOUNT_NEW_SUCCESS || action.type === AUTH_SUCCESS) {
    return {
      ...state,
      account: {
        id: action.payload.account.identifier,
        name: action.payload.account.name,
        userName: action.payload.account.username,
        email: action.payload.account.email,
        password: action.payload.account.password,
        sshKeyPublic: action.payload.account.sshPublicKey,
        sshKeyPrivate: action.payload.account.privateKey
      },
      isAuthenticated: true,
      isFetching: false
    }
  }

  if (action.type === ACCOUNT_NEW_FAILURE) {
    // TODO
    return state
  }
  
  if (action.type === AUTH_REQUEST) {
    return merge(
      {},
      state,
      {
        isAuthenticated: false,
        isFetching: true
      }
    )
  }

  if (action.type === AUTH_FAILURE) {
    // TODO
    return {
      ...state,
      isAuthenticated: false,
      isFetching: false
    }
  }

  if (action.type === AUTH_RESET) {
    return {
      ...state,
      isAuthenticated: false,
      isFetching: false
    }
  }

  return state
}
