import React, { Component, PropTypes } from 'react'

// component
import './menuItem.less'

/**
 * UI: NavItem component
 *
 */
export class NavItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    index: PropTypes.number,
    label: PropTypes.string.isRequired,
    number: PropTypes.number
  }

  render() {
    const { active, index, label, number } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ `nav-item${index ? ` nav-${index}` : ' nav-default'}${active ? ' nav--active' : ''}` }
      >
        <div
          className="nav-highlight"
        >
          &nbsp;
        </div>
        <div className="nav-label">
          { label }
        </div>
        <div className="nav-number">
          { number }
        </div>
      </div>
    )
  }
}

export default NavItem
