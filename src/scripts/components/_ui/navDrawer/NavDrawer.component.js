import React, { Component, PropTypes } from 'react'

// UI library component
import { NavDrawer as ToolboxNavDrawer } from 'react-toolbox'

// component
import './navDrawer.less'

/**
 * UI: NavDrawer component
 *
 */
export class NavDrawer extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: React.PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]),
    onOverlayClick: PropTypes.func,
    permanentAt: PropTypes.string,
    pinned: PropTypes.bool,
    scrollY: PropTypes.bool,
    width: PropTypes.string
  }

  render() {
    const { children, active, onOverlayClick, permanentAt, pinned, scrollY, width } = this.props // eslint-disable-line no-shadow

    return (
      <ToolboxNavDrawer
        active={ active }
        className={ (pinned || active) ? 'nav nav--open' : 'nav nav--closed' }
        onOverlayClick={ onOverlayClick }
        permanentAt={ permanentAt }
        pinned={ pinned }
        scrollY={ scrollY }
        width={ width }
      >
        { children }
      </ToolboxNavDrawer>
    )
  }
}

export default NavDrawer
