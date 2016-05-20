import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { setTheme, setLocale } from './app.actions'
const lightTheme = getMuiTheme()
const darkTheme = getMuiTheme(darkBaseTheme)

// Component
import '../../../favicon.ico'
import '../../../images/logo-kodokojo-icon.png'
import AppHeader from './AppHeader.component'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    setLocale: PropTypes.func.isRequired,
    themeSelected: PropTypes.string.isRequired
  }

  render() {
    const { children, themeSelected, locale, setLocale, isAuthenticated } = this.props // eslint-disable-line no-shadow
    const currentMuiTheme = (themeSelected === 'light') ? lightTheme : darkTheme

    return (
      <MuiThemeProvider muiTheme={currentMuiTheme}>
        <div>
          <AppHeader
            isAuthenticated={isAuthenticated}
            languageSelected={locale}
            onLanguageChange={(value) => setLocale(value)}
          />
          {children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateProps = (state) => (
  {
    locale: state.prefs.locale,
    themeSelected: state.prefs.theme,
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(
  mapStateProps,
  {
    setTheme,
    setLocale
  }
)(App)
