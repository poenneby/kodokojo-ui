import {
  PREF_THEME_SET,
  PREF_LOCALE_SET,
  PREF_NAV_VISIBILITY_SET
} from '../../commons/constants'

export function setTheme(theme) {
  return {
    type: PREF_THEME_SET,
    theme
  }
}

export function setLocale(locale) {
  return {
    type: PREF_LOCALE_SET,
    locale
  }
}

export function setNavVisibility(navigation) {
  return {
    type: PREF_NAV_VISIBILITY_SET,
    navigation
  }
}
