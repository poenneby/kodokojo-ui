import { EMAIL_INIT, EMAIL_SENT, ACCOUNT_INIT, ACCOUNT_CREATED } from '../../commons/constants'

const initialState = {
  email: 'default',
  uploaded: false
}

export default function login(state = initialState, action) {
  if (action.type === EMAIL_INIT) {
    console.log('sending email...', action.email)
    return { ...state, email: action.email }
  }

  if (action.type === EMAIL_SENT) {
    console.log('email sent', action.payload.email)
    return { ...state, email: action.payload.email }
  }

  if (action.type === ACCOUNT_INIT) {
    console.log('account is initializing...', action.account)
    return {...state, account: action.account}
  }

  if (action.type === ACCOUNT_CREATED) {
    console.log('account is created', action.payload.account)
    return {...state, account: action.payload.account}
  }

  return state
}