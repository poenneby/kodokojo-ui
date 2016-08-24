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
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

// Component
import { BRICK } from '../../commons/identifiers'
import '../../../styles/_commons.less'
import brickTheme from './brick.scss'
import { getBrickStatus, enumBrickStatus } from '../../services/param.service'

// TODO TU
// Brick component
export class Brick extends Component {

  static propTypes = {
    brick: PropTypes.object,
    intl: intlShape.isRequired,
    theme: PropTypes.object
  }

  handleLoadStatus(e) {
    e.target.classList.add(brickTheme['brick-status--loaded'])
  }

  render() {
    const { brick, theme } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    const status = getBrickStatus(brick && brick.state ? brick.state : undefined)
    const brickClasses = classNames(theme.brick, theme['brick-item'])

    return (
      <div className={ brickClasses }>
        <div className={ theme['brick-type'] }>
          { brick ? brick.type : '-' }
        </div>
        <div className={ theme['brick-name'] }>
          { brick ? brick.name : '-' }
        </div>
        <div className={ theme['brick-state'] }>
          <img
            className={ theme['brick-status'] }
            onLoad={ this.handleLoadStatus }
            src={ status.image }
            title={ formatMessage({ id: `status-${status.label}-label` }) }
          />
        </div>
        <div className={ theme['brick-version'] }>
          { brick ? brick.version : '-' }
        </div>
        <div className={ theme['brick-link'] }>
          { brick && brick.url && status.label === enumBrickStatus.RUNNING.label ?
            <a href={ brick.url } target="_blank">{ brick.url }</a> :
            '-'
          }
        </div>
      </div>
    )
  }
}

export default themr(BRICK, brickTheme)(
  injectIntl(Brick)
)
