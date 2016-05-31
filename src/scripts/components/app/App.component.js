import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { setTheme, setLocale, setNavVisibility } from './app.actions'
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
import Menu from '../menu/Menu.component'

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    navigation: PropTypes.bool,
    setLocale: PropTypes.func.isRequired,
    setNavVisibility: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  render() {
    const { children, theme, locale, location, setLocale, isAuthenticated, navigation, setNavVisibility } = this.props // eslint-disable-line no-shadow
    const currentMuiTheme = (theme === 'light') ? lightTheme : darkTheme

    return (
      // TODO remove MuiThemeProvider after removing all dependency to MUI (replace by custom theme provider)
      <MuiThemeProvider muiTheme={ currentMuiTheme }>
      <Layout>
        <AppHeader
          isAuthenticated={ isAuthenticated }
          languageSelected={ locale }
          onLanguageChange={ (value) => setLocale(value) }
        />
        <Panel>
          <Nav
            active={ navigation }
          >
            <Menu />
          </Nav>
          <Content>
            { children }
          </Content>
        </Panel>
      </Layout>
      </MuiThemeProvider>
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
    setNavVisibility
  }
)(App)
