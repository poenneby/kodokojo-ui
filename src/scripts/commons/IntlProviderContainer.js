import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import fr from '../i18n/fr'
import en from '../i18n/en'

const i18n = { fr, en }

function mapStateToProps(state) {
  const locale = state.prefs.locale
  const messages = i18n[locale]
  return { locale, messages }
}

export default connect(mapStateToProps)(IntlProvider)
