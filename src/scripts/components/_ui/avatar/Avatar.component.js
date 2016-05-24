import React, { Component, PropTypes } from 'react'

// UI library component
import { Avatar as ToolboxAvatar } from 'react-toolbox'

// component

/**
 * UI: Avatar component
 *
 */
export class Avatar extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    image: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    title: PropTypes.string
  }

  render() {
    const { children, icon, image, title } = this.props // eslint-disable-line no-shadow

    return (
      <ToolboxAvatar
        icon={ icon }
        image={ image }
        title={ title }
      >
        { children }
      </ToolboxAvatar>
    )
  }
}

export default Avatar
