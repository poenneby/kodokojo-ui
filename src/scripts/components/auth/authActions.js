import { EMAIL_UPDATE } from '../../commons/constants'

export function updateEmail(email) {
  return dispatch => {
    return {
      type: EMAIL_UPDATE,
      email: email
    }
  }
}