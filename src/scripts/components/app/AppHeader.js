import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import AppBar from 'material-ui/AppBar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

// Component
import './appHeader.less'
import logoKodoKojo from '../../../images/logo-kodokojo-bl.svg'

// AppHeader
export class AppHeader extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    languageSelected: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { languageSelected, onLanguageChange } = this.props
    const { formatMessage } = this.props.intl

    return (
      <AppBar
        className="app-bar app-header"
        showMenuIconButton={false}
        title={<img src={ logoKodoKojo } />}
        titleStyle={{paddingTop: '10px', overflow: 'visible'}}
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
          labelStyle={ {color: '#fff'} }
          onChange={ (event,i,v) => onLanguageChange(v) }
          value={ languageSelected }
        >
          <MenuItem primaryText={ formatMessage({id:'app-lang-en-label'}) }
                    value="en"
          />
          <MenuItem primaryText={ formatMessage({id:'app-lang-fr-label'}) }
                    value="fr"
          />
        </DropDownMenu>
      </AppBar>
    )
  }
}

export default injectIntl(AppHeader)
