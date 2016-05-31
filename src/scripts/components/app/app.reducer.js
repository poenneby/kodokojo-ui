import has from 'lodash/has'

import { prefs as prefsDefault } from './prefs'
import {
  PREF_THEME_SET,
  PREF_LOCALE_SET,
  PREF_NAV_VISIBILITY_SET
} from '../../commons/constants'

export default function prefs(state = prefsDefault, action) {
  if (action.type === PREF_THEME_SET && has(action, 'theme')) {
    return {
      ...state,
      theme: action.theme
    }
  }
  if (action.type === PREF_LOCALE_SET && has(action, 'locale')) {
    return {
      ...state,
      locale: action.locale
    }
  }
  if (action.type === PREF_NAV_VISIBILITY_SET && has(action, 'navigation')) {
    return {
      ...state,
      navigation: action.navigation
    }
  }
  return state
}
