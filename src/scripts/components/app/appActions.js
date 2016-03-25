import has from 'lodash/has'
import { SET_THEME } from '../../commons/constants'

export function setTheme(theme) {
  return { type: SET_THEME, theme }
}

// export function setLocale(locale) {
//   return { type: SET_LOCALE, locale }
// }
