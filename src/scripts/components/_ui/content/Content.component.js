import React, { Component, PropTypes } from 'react'

// component
import './content.less'

/**
 * UI: Content component
 *
 */
export class Content extends Component {

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
        className="content"
      >
        { children }
      </div>
    )
  }
}

export default Content
