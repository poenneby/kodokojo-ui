import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { setTheme, setLocale, setNavVisiblity } from './app.actions'
const lightTheme = getMuiTheme()
const darkTheme = getMuiTheme(darkBaseTheme)

// Component
import '../../../favicon.ico'
import '../../../images/logo-kodokojo-icon.png'
import '../../../styles/_variables.less'
import '../../../styles/_reset.less'
import Layout from '../_ui/layout/Layout.component'
import Nav from '../_ui/nav/Nav.component.js'
import Panel from '../_ui/panel/Panel.component'
import Content from '../_ui/content/Content.component.js'
import AppHeader from './AppHeader.component'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    navigation: PropTypes.bool,
    setLocale: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  render() {
    const { children, theme, locale, setLocale, isAuthenticated, navigation, setNavVisiblity } = this.props // eslint-disable-line no-shadow
    const currentTheme = (theme === 'light') ? lightTheme : darkTheme

    return (
      <Layout>
        <AppHeader
          isAuthenticated={isAuthenticated}
          languageSelected={locale}
          onLanguageChange={(value) => setLocale(value)}
        />
        <Panel>
          <Nav
            active={ navigation }
          >
            <div>children</div>
          </Nav>
          <Content>
            {children}
          </Content>
        </Panel>
      </Layout>
    )
  }
}

const mapStateProps = (state, ownProps) => (
  {
    locale: state.prefs.locale,
    theme: state.prefs.theme,
    navigation: state.prefs.navigation,
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(
  mapStateProps,
  {
    setTheme,
    setLocale,
    setNavVisiblity
  }
)(App)
