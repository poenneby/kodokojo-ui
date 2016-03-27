import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import { setTheme, setLocale } from './appActions'
const lightTheme = getMuiTheme()
const darkTheme = getMuiTheme(darkBaseTheme)

import AppHeader from './AppHeader'

class App extends Component {
  render() {
    const { children, themeSelected, locale, setLocale } = this.props
    const currentMuiTheme = (themeSelected === 'light') ? lightTheme : darkTheme

    return (
      <MuiThemeProvider muiTheme={currentMuiTheme}>
        <div>
          <AppHeader
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
  children: PropTypes.element.isRequired,
  themeSelected: PropTypes.string,
  locale: PropTypes.string,
  setLocale: PropTypes.func
}

const mapStateProps = (state) => {
  return {
    locale: state.prefs.locale,
    themeSelected: state.prefs.theme
  }
}

export default connect(
  mapStateProps,
  {
    setTheme,
    setLocale
  }
)(App)
