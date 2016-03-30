import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import AppBar from 'material-ui/lib/app-bar'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import './appHeader.less'

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
        title={<img src="../../../images/logo-kodokojo-bl.svg"/>}
        titleStyle={{paddingTop: '10px', overflow: 'visible'}}
        className={'app-bar'}
        showMenuIconButton={false}
        style={{backgroundColor: '#242424'}}
      >
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/users">Users</Link>
        </div>
        <DropDownMenu
          className={'locale-selector'}
          value={languageSelected}
          labelStyle={{color: '#fff'}}
          onChange={(event,i,v) => onLanguageChange(v)}
        >
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
