import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// UI library component
import { AppBar as ToolboxAppBar } from 'react-toolbox'

// component
import { APP_BAR } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import appBarTheme from './appBar.scss'
import logoKodoKojo from '../../../../images/logo-white-kodokojo.svg'

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
    theme: PropTypes.object
  }

  render() {
    const { children, fixed, flat, theme } = this.props // eslint-disable-line no-shadow

    return (
      <ToolboxAppBar
        className={ theme['header-bar'] }
        fixed={ fixed }
        flat={ flat }
      >
        <img className={ theme['logo-kodokojo'] } src={logoKodoKojo} />
        { children }
      </ToolboxAppBar>
    )
  }
}

export default themr(APP_BAR, appBarTheme)(AppBar)
