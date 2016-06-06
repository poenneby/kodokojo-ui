import React, { Component, PropTypes } from 'react'

// UI library component
import { Input as ToolboxInput } from 'react-toolbox/lib/input'

// component
import inputTheme from './input.scss'

/**
 * UI: Input component
 *
 */
const Input = (props) => (
  <ToolboxInput{...props} theme={ inputTheme } />
)

export default Input
