import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { ACTION } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import actionTheme from './action.scss'

/**
 * UI: Action component
 *
 */
export const Action = ({ children, theme }) => (
  <div
    className={ theme.action }
  >
    { children }
  </div>
)

Action.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  theme: PropTypes.object
}

export default themr(ACTION, actionTheme)(Action)
