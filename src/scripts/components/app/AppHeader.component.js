import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
// FIXME temporary commented, must be replace by toolbox or custom components
// import DropDownMenu from 'material-ui/DropDownMenu'
// import MenuItem from 'material-ui/MenuItem'
// import Navigation from 'react-toolbox/lib/navigation'

import AppBar from '../_ui/appBar/AppBar.component'

// Component
import '../../../styles/_commons.less'

// AppHeader
export class AppHeader extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    languageSelected: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired
  }

  render() {
    const { languageSelected, onLanguageChange } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <AppBar
        flat
      />
      // FIXME this is for testing purpose, delete when tabs are implemented
      // <Navigation type="horizontal">
      //   <Link to="/">
      //   <FormattedMessage id={'app-menu-home-label'}/>
      //   </Link>
      //   {' | '}
      //   <Link to="/users">
      //     <FormattedMessage id={'app-menu-users-label'}/>
      //   </Link>
      // </Navigation>

      // TODO move this in app header, set param to show / hide language switch + automatically browser available languages
      // <DropDownMenu
      //   className={ 'locale-selector' }
      //   labelStyle={ {color: '#fff'} }
      //   onChange={ (event,i,v) => onLanguageChange(v) }
      //   value={ languageSelected }
      // >
      //   <MenuItem primaryText={ formatMessage({id:'app-lang-en-label'}) }
      //             value="en"
      //   />
      //   <MenuItem primaryText={ formatMessage({id:'app-lang-fr-label'}) }
      //             value="fr"
      //   />
      // </DropDownMenu>

    )
  }
}

export default injectIntl(AppHeader)
