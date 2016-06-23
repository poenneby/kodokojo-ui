import React, { Component, PropTypes } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { themr } from 'react-css-themr'

// UI library component
import { AppBar as ToolboxAppBar } from 'react-toolbox'

// component
import { APP_BAR } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import appBarTheme from './appBar.scss'
import logoKodoKojo from '../../../../images/logo-white-kodokojo.svg'
import IconButton from '../../_ui/button/IconButton.component'

/**
 * UI: AppBar component
 */
export class AppBar extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
    ]),
    fixed: PropTypes.bool,
    flat: PropTypes.bool,
    intl: intlShape.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    theme: PropTypes.object
  }

  render() {
    const { children, fixed, flat, isAuthenticated, onLogout, theme } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <ToolboxAppBar
        className={ theme['header-bar'] }
        fixed={ fixed }
        flat={ flat }
      >
        <img className={ theme['logo-kodokojo'] } src={logoKodoKojo} />
        { children }
        { isAuthenticated &&
          <IconButton
            icon="power_settings_new"
            onClick={ () => onLogout() }
            style={{ display: 'flex', selfAlign: 'flex-end' }}
            title={ formatMessage({ id: 'logout-label' }) }
          />
        }
      </ToolboxAppBar>
    )
  }
}

export default themr(APP_BAR, appBarTheme)(injectIntl(AppBar))
