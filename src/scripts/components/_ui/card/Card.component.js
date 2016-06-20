import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// component
import { CARD } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import cardTheme from './card.scss'

/**
 * UI: Card component
 *
 */
export class Card extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.string
    ]),
    className: PropTypes.string,
    merged: PropTypes.bool,
    primary: PropTypes.bool,
    row: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { children, className, merged, primary, row, style, theme, title } = this.props // eslint-disable-line no-shadow
    const cardClasses = classNames(theme.card, {
      [theme['card--merged']]: merged,
      [theme['card--primary']]: primary,
      [theme['card--default']]: !primary,
      [theme['card-row']]: row
    }, className)

    return (
      <div
        className={ cardClasses }
        style={ style }
      >
        { title &&
          <div className={ theme['card-title'] }>
            { title }
          </div>
        }
        { children }
      </div>
    )
  }
}

export default themr(CARD, cardTheme)(Card)
