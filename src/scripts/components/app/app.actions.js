import {
  SET_THEME,
  SET_LOCALE,
  SET_NAV_VISIBILITY
} from '../../commons/constants'

export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme
  }
}

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale
  }
}

export function setNavVisiblity(visibility) {
  return {
    type: SET_NAV_VISIBILITY,
    visibility
  }
}
