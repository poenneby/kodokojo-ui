import React, { Component, PropTypes } from 'react'

// UI library component
import { Panel as ToolboxPanel } from 'react-toolbox'

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
    ]),
    scrollY: PropTypes.bool
  }

  render() {
    const { children, scrollY } = this.props // eslint-disable-line no-shadow

    return (
      <ToolboxPanel
        className="panel"
        scrollY={ scrollY }
      >
        { children }
      </ToolboxPanel>
    )
  }
}

export default Panel
