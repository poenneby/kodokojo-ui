import React, { Component, PropTypes } from 'react'

// component
import './panel.less'

/**
 * UI: Panel component
 *
 */
export class Panel extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className="panel"
      >
        { children }
      </div>
    )
  }
}

export default Panel
