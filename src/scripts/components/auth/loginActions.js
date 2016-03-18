import api from '../../commons/config'
import { CALL_API } from 'redux-api-middleware';
// import { user } from '../../commons/schemas'
import { AUTHENT_REQUEST, AUTHENT_SUCCESS, AUTH_FAILURE } from '../../commons/constants'

export function requestAuthentication(login, psw) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: `${api.user}/`,
      types: [
        {
          type: AUTHENT_REQUEST,
          payload: (action, state) => {
            console.log(action)
          }
        },
        AUTHENT_SUCCESS,
        AUTH_FAILURE
      ]

      // schema: user
    }
  }
}


export function authenticate(login, psw) {
  return dispatch => {
    return dispatch(requestAuthentication(login, psw))
  }

}
