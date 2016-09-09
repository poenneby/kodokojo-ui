import { stopSubmit } from 'redux-form'

export function updateFieldError(form, field, errorMessage) {
  return dispatch => dispatch(
    stopSubmit(form, { [field]: errorMessage })
  )
}
