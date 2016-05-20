import React, { Component, PropTypes } from 'react'

// UI library component
import { AppBar as ToolboxAppBar } from 'react-toolbox'

// component
import './appBar.less'
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
    flat: PropTypes.bool
  }

  render() {
    const { children, fixed, flat } = this.props // eslint-disable-line no-shadow

    return (
      <ToolboxAppBar
        className="header-bar"
        fixed={ fixed }
        flat={ flat }
      >
        <img className="logo-kodokojo" src={logoKodoKojo} />
        { children }
      </ToolboxAppBar>
    )
  }
}

export default AppBar
