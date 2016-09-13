/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
export const Action = ({
  children,
  theme,
  type = 'left'
}) => (
  <div
    className={ theme[`action--${type}`] }
  >
    { children }
  </div>
)

Action.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node
  ]),
  theme: PropTypes.object,
  type: PropTypes.oneOf(['left', 'right'])
}

export default themr(ACTION, actionTheme)(Action)
