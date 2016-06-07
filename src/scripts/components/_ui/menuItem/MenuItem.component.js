import React, { Component, PropTypes } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { Link } from 'react-router'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// component
import { MENU_ITEM } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
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
          { labelKey ?
            formatMessage({ id: labelKey }) :
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
