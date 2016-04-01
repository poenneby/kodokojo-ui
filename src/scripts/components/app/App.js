import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import { setTheme, setLocale } from './appActions'
const lightTheme = getMuiTheme()
const darkTheme = getMuiTheme(darkBaseTheme)

import '../../../favicon.ico'
import '../../../images/logo-kodokojo-icon.png'
import './app.less'
import AppHeader from './AppHeader'

class App extends Component {
  render() {
    const { children, themeSelected, locale, setLocale, isAuthenticated } = this.props
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

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  themeSelected: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired
}

const mapStateProps = (state) => {
  return {
    locale: state.prefs.locale,
    themeSelected: state.prefs.theme,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(
  mapStateProps,
  {
    setTheme,
    setLocale
  }
)(App)
