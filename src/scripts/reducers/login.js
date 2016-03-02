import { EMAIL_SENT } from '../commons/constants'

const initialState = {
  email: 'default'
}

export default function login(state = initialState, action) {
  if (action.type === EMAIL_SENT) {
    console.log('email sent', action.payload.email)
    return { ...state, email: action.payload.email }
  }
  return state
}