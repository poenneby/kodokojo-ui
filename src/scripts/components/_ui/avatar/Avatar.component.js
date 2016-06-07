import React, { Component, PropTypes } from 'react'

// UI library component
import { Avatar as ToolboxAvatar } from 'react-toolbox'
import avatarTheme from 'react-toolbox/components/avatar/theme.scss'

// component
import '../../../../styles/_commons.less'

/**
 * UI: Avatar component
 *
 */
const Avatar = (props) => (
  <ToolboxAvatar {...props} theme={ avatarTheme } />
)

export default Avatar
