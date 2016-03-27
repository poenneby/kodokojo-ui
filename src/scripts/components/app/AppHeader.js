import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Ui
import AppBar from 'material-ui/lib/app-bar'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

// AppHeader
export const AppHeader = class AppHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { languageSelected, onLanguageChange } = this.props
    const { messages } = this.props.intl

    return (
      <AppBar
        title="Kodo Kojo"
        className={'app-bar'}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      >
        {'>> '}
        <Link to="/">Home</Link>
        {' > '}
        <Link to="/users">Users</Link>
        <DropDownMenu className={'locale-selector'} value={languageSelected} onChange={(event,i,v) => onLanguageChange(v)}>
          <MenuItem value="en" primaryText="English"/>
          <MenuItem value="fr" primaryText="Français"/>
        </DropDownMenu>
      </AppBar>
    )
  }
}

AppHeader.propTypes = {
  intl: intlShape.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  languageSelected: PropTypes.string.isRequired
}

export default injectIntl(AppHeader)
