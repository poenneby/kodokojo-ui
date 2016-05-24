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
import '../../../styles/_variables.less'
import '../../../styles/_reset.less'
import Layout from '../_ui/layout/Layout.component'
import NavDrawer from '../_ui/navDrawer/NavDrawer.component'
import Panel from '../_ui/panel/Panel.component'
import AppHeader from './AppHeader.component'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isNavVisible: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    setLocale: PropTypes.func.isRequired,
    themeSelected: PropTypes.string.isRequired
  }

  render() {
    const { children, themeSelected, locale, setLocale, isAuthenticated, isNavVisible } = this.props // eslint-disable-line no-shadow
    const currentMuiTheme = (themeSelected === 'light') ? lightTheme : darkTheme

    return (
      <MuiThemeProvider muiTheme={currentMuiTheme}>
        <Layout>
          <Panel>
            <AppHeader
              isAuthenticated={isAuthenticated}
              languageSelected={locale}
              onLanguageChange={(value) => setLocale(value)}
            />
            <Layout>
              <NavDrawer
                pinned={ !isNavVisible }
              />
              <Panel>
                {children}
              </Panel>
            </Layout>
          </Panel>
        </Layout>
      </MuiThemeProvider>
    )
  }
}

const mapStateProps = (state, ownProps) => (
  {
    locale: state.prefs.locale,
    themeSelected: state.prefs.theme,
    isAuthenticated: state.auth.isAuthenticated,
    isNavVisible: ownProps.isNavVisible
  }
)

export default connect(
  mapStateProps,
  {
    setTheme,
    setLocale
  }
)(App)
