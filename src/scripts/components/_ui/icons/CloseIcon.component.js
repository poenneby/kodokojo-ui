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

import React from 'react'
import SVGInline from 'react-svg-inline'

/**
 * UI: Close Icon
 *
 */
const CloseIcon = (props) => (
  <SVGInline
    svg={ `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
      <g id="XMLID_551_">
        <g>
          <path fill="#73C7D2" d="M6.583,13.963c0.122,0,0.244-0.047,0.337-0.14l3.199-3.199l3.198,3.199c0.093,0.093,0.215,0.14,0.337,0.14
            s0.244-0.047,0.337-0.14c0.186-0.187,0.186-0.487,0-0.674l-3.199-3.198l3.03-3.031c0.187-0.186,0.187-0.487,0-0.673
            c-0.186-0.187-0.487-0.187-0.673,0l-3.03,3.03l-3.031-3.03c-0.186-0.187-0.487-0.187-0.673,0c-0.187,0.186-0.187,0.487,0,0.673
            l3.03,3.031l-3.198,3.198c-0.187,0.187-0.187,0.487,0,0.674C6.34,13.916,6.461,13.963,6.583,13.963z"/>
          <path fill="#73C7D2" d="M0,10c0,5.421,4.579,10,10,10c5.42,0,10-4.579,10-10S15.42,0,10,0C4.579,0,0,4.579,0,10z M10,0.952
            c4.904,0,9.047,4.144,9.047,9.048S14.904,19.048,10,19.048S0.952,14.904,0.952,10S5.096,0.952,10,0.952z"/>
        </g>
      </g>
      </svg>
    `}
  />
)

export default CloseIcon
