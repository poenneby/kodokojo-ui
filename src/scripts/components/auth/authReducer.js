import merge from 'lodash/merge';
import { ACCOUNT_ID_REQUEST, ACCOUNT_ID_SUCCESS, ACCOUNT_REQUEST, ACCOUNT_SUCCESS } from '../../commons/constants'

const initialState = {
  account: {},
  isFetching: false
}

export default function auth(state = initialState, action) {
  if (action.type === ACCOUNT_ID_REQUEST) {
    return {
      ...state,
      account: {
        email: action.email
      }
    }
  }

  if (action.type === ACCOUNT_ID_SUCCESS) {
    return merge(
        {},
        state,
        {
          account: {
            id: action.payload.account.id
          }
        }
    )
  }

  if (action.type === ACCOUNT_REQUEST) {
    return state
  }

  if (action.type === ACCOUNT_SUCCESS) {
    return merge(
        {},
        state,
        {
          account: {
            id: action.payload.account.identifier,
            name: action.payload.account.name,
            userName: action.payload.account.userName,
            email: action.payload.account.email,
            password: action.payload.account.password,
            sshKeyPublic: action.payload.account.sshPublicKey,
            sshKeyPrivate: action.payload.account.privateKey
          }
        }
    )
  }

  return state
}
