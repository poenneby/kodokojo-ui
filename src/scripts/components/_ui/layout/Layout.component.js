import React, { Component, PropTypes } from 'react'

// UI library component
import { Layout as ToolboxLayout } from 'react-toolbox'

// component

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
      <ToolboxLayout>
        { children }
      </ToolboxLayout>
    )
  }
}

export default Layout
