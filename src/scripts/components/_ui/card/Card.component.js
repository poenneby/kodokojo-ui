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
    primary: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { children, className, primary, style, title } = this.props // eslint-disable-line no-shadow
    const cardClasses = classNames(cardTheme.card, {
      [cardTheme['card--primary']]: primary,
      [cardTheme['card--default']]: !primary
    }, className)

    return (
      <div
        className={ cardClasses }
        style={ style }
      >
        { title &&
          <div className={ cardTheme['card-title'] }>
            { title }
          </div>
        }
        { children }
      </div>
    )
  }
}

export default themr(CARD, cardTheme)(Card)
