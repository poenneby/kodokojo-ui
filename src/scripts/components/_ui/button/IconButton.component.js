import React, { Component, PropTypes } from 'react'

// UI library component
import { IconButton as ToolboxIconButton } from 'react-toolbox/lib/button'

// component
import '../../../../styles/_commons.less'
import iconButtonTheme from './iconButton.scss'

/**
 * UI: IconButton component
 *
 */
const IconButton = (props) => (
  <ToolboxIconButton {...props} theme={ iconButtonTheme } />
)

export default IconButton
