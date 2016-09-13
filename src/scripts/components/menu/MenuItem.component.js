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
import { intlShape, injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// component
import { MENU_ITEM } from '../../commons/identifiers'
import '../../../styles/_commons.less'
import menuItemTheme from './menuItem.scss'

/**
 * UI: MenuItem component
 *
 */
export class MenuItem extends Component {

  static propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    intl: intlShape.isRequired,
    labelKey: PropTypes.string,
    labelText: PropTypes.string,
    level: PropTypes.number,
    number: PropTypes.number,
    onClick: PropTypes.func,
    route: PropTypes.string,
    theme: PropTypes.object,
    titleKey: PropTypes.string,
    titleText: PropTypes.string
  }

  render() {
    const { active, disabled, index, labelKey, labelText,
      level, number, onClick, route, titleKey, titleText } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl
    const { theme } = this.props

    const menuItemClasses = classNames(theme['menu-item'], {
      [theme[`menu-${level}`]]: level !== undefined,
      [theme['menu-default']]: level === undefined,
      [theme['menu--active']]: (!disabled && active),
      [theme['menu-item--disabled']]: (disabled || active)
    })

    return (
      <Link
        className={ menuItemClasses }
        onClick={ onClick }
        title= { titleKey ?
          formatMessage({ id: titleKey }) :
          titleText
        }
        to={ route || '#' }
      >
        <div
          className={ theme['menu-highlight'] }
        >
          &nbsp;
        </div>
        <div className={ theme['menu-label'] }>
          { labelKey &&
            formatMessage({ id: labelKey })
          }
          { labelText && !labelKey &&
            labelText
          }
        </div>
        <div className={ theme['menu-number'] }>
          { number }
        </div>
      </Link>
    )
  }
}

export default themr(MENU_ITEM, menuItemTheme)(injectIntl(MenuItem))
