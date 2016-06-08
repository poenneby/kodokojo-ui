import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// component
import { NAV } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import navTheme from './nav.scss'

/**
 * UI: Nav component
 *
 */
export class Nav extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
    ]),
    onOverlayClick: PropTypes.func,
    permanentAt: PropTypes.string,
    pinned: PropTypes.bool,
    scrollY: PropTypes.bool,
    theme: PropTypes.theme,
    width: PropTypes.string
  }

  render() {
    const { children, active, onOverlayClick, permanentAt, pinned, scrollY, theme, width } = this.props // eslint-disable-line no-shadow
    const navClasses = classNames(theme.nav, {
      [theme['nav--open']]: (pinned || active),
      [theme['nav--closed']]: (!pinned && !active)
    })

    return (
      <div
        className={ navClasses }
      >
        <aside
          // onOverlayClick={ onOverlayClick }
          // permanentAt={ permanentAt }
          // pinned={ pinned }
          // scrollY={ scrollY }
        >
          { children }
        </aside>
      </div>
    )
  }
}

export default themr(NAV, navTheme)(Nav)
