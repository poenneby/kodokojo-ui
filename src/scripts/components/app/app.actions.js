import { SET_THEME, SET_LOCALE } from '../../commons/constants'

export function setTheme(theme) {
  return { type: SET_THEME, theme }
}

export function setLocale(locale) {
  return { type: SET_LOCALE, locale }
}
