import React, { Component, PropTypes } from 'react'

// component
import './layout.less'

/**
 * UI: Layout component
 *
 */
export class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <div className="layout">
        { children }
      </div>
    )
  }
}

export default Layout
