import React, { Component, PropTypes } from 'react'

// component
import './nav.less'

/**
 * UI: Nav component
 *
 */
export class Nav extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
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
      <div
        className={ (pinned || active) ? 'nav nav--open' : 'nav nav--closed' }
      >
        <aside
          // onOverlayClick={ onOverlayClick }
          // permanentAt={ permanentAt }
          // pinned={ pinned }
          // scrollY={ scrollY }
        >
          { children }
        </aside>
      </div>
    )
  }
}

export default Nav
