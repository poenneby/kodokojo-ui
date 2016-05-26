import React, { Component, PropTypes } from 'react'

// component
import './navItem.less'

/**
 * UI: NavItem component
 *
 */
export class NavItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    number: PropTypes.number
  }

  render() {
    const { active, index, label, number } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ `nav-item nav-${index}${active ? ' nav--active' : ''}` }
      >
        <div
          className={ 'nav-highlight' }
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
