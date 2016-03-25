import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'

// AppHeader
export const AppHeader = class AppHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar
        title="Kodo Kojo"
        className={'app-bar'}
        iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
}

export default AppHeader