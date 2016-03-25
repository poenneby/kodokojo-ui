import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// UI
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'

import { setTheme } from './appActions'
const lightTheme = getMuiTheme()
const darkTheme = getMuiTheme(darkBaseTheme)

import AppHeader from './AppHeader'

class App extends Component {
  render() {
    const { children, themeSelected, setTheme } = this.props
    const currentMuiTheme = (themeSelected === 'light') ? lightTheme : darkTheme

    return (
      <MuiThemeProvider muiTheme={currentMuiTheme}>
        <div>
          <AppHeader />
          <header>
            {'>> '}
            <Link to="/">Home</Link>
            {' > '}
            <Link to="/users">Users</Link>
          </header>
          {children}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  themeSelected: PropTypes.string,
  setTheme: PropTypes.func
}

const mapStateProps = (state, ownProps) => {
  return {
    themeSelected: state.prefs.theme
  }
}

export default connect(
  mapStateProps,
  { setTheme }
)(App)
