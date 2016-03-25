import has from 'lodash/has'

import { prefs as prefsDefault } from './prefs'

import { SET_THEME } from '../../commons/constants'

export default function prefs(state = prefsDefault, action) {
  if (action.type === SET_THEME && has(action, 'theme')) {
    return {
      ...state,
      theme: action.theme
    }
  }
  // if (action.type === SET_LOCALE && has(action, 'locale')) {
  //   return {
  //     ...state,
  //     locale: action.locale
  //   }
  // }
  return state
}