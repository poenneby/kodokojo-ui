import React, { Component, PropTypes } from 'react'

// UI library component
import { Checkbox as ToolboxCheckbox } from 'react-toolbox/lib/checkbox'

// component
import '../../../../styles/_commons.less'
import checkboxTheme from './checkbox.scss'

/**
 * UI: Checkbox component
 *
 */
const Checkbox = (props) => (
  <ToolboxCheckbox {...props} theme={ checkboxTheme } />
)

export default Checkbox
