import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import AppBar from 'material-ui/lib/app-bar'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import './appHeader.less'
import logoKodoKojo from '../../../images/logo-kodokojo-bl.svg'

// AppHeader
export const AppHeader = class AppHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { languageSelected, onLanguageChange } = this.props
    const { formatMessage } = this.props.intl

    return (
      <AppBar
        title={<img src={ logoKodoKojo } />}
        titleStyle={{paddingTop: '10px', overflow: 'visible'}}
        className="app-bar app-header"
        showMenuIconButton={false}
      >
        <div className="breadcrumb">
          <Link to="/">
            <FormattedMessage id={'app-nav-home-label'}/>
          </Link>
          {' | '}
          <Link to="/users">
            <FormattedMessage id={'app-nav-users-label'}/>
          </Link>
        </div>
        <DropDownMenu
          className={ 'locale-selector' }
          value={ languageSelected }
          labelStyle={ {color: '#fff'} }
          onChange={ (event,i,v) => onLanguageChange(v) }
        >
          <MenuItem value="en" primaryText={ formatMessage({id:'app-lang-en-label'}) }/>
          <MenuItem value="fr" primaryText={ formatMessage({id:'app-lang-fr-label'}) }/>
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
