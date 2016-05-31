import React, { Component, PropTypes } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { Link } from 'react-router'

// component
import './menuItem.less'

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
    titleKey: PropTypes.string,
    titleText: PropTypes.string
  }

  render() {
    const { active, disabled, index, labelKey, labelText,
      level, number, onClick, route, titleKey, titleText } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <Link
        className={
          `menu-item${level !== undefined ? ` menu-${level}` : ' menu-default'}` +
          `${active && !disabled ? ' menu--active' : ''}` +
          `${disabled || active ? ' menu-item--disabled' : ''}`
        }
        onClick={ onClick }
        title= { titleKey ?
          formatMessage({ id: titleKey }) :
          titleText
        }
        to={ route || '#' }
      >
        <div
          className="menu-highlight"
        >
          &nbsp;
        </div>
        <div className="menu-label">
          { labelKey ?
            formatMessage({ id: labelKey }) :
            labelText
          }
        </div>
        <div className="menu-number">
          { number }
        </div>
      </Link>
    )
  }
}

export default injectIntl(MenuItem)
