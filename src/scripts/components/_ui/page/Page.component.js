import React, { Component, PropTypes } from 'react'

// component
import './page.less'

/**
 * UI: Page component
 *
 */
export class NavDrawer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <section
        className="page"
      >
        { children }
      </section>
    )
  }
}

export default NavDrawer
