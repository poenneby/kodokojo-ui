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
import { CARD_CONTAINER } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import cardContainerTheme from './cardContainer.scss'

/**
 * UI: CardContainer component
 *
 */
export class CardContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
    ]),
    className: PropTypes.string,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { className, children, theme } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ theme['card-container'] }
      >
        { children }
      </div>
    )
  }
}

export default themr(CARD_CONTAINER, cardContainerTheme)(CardContainer)
