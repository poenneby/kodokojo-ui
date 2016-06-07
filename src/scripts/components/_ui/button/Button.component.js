import React, { Component, PropTypes } from 'react'

// UI library component
import { Button as ToolboxButton } from 'react-toolbox/lib/button'

// component
import '../../../../styles/_commons.less'
import buttonTheme from './button.scss'

/**
 * UI: Button component
 *
 */
const Button = (props) => (
  <ToolboxButton {...props} theme={ buttonTheme } />
)

export default Button
