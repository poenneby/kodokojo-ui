import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// component
import { CARD_CONTENT } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import cardContentTheme from './cardContent.scss'

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
    row: PropTypes.bool,
    small: PropTypes.bool,
    standard: PropTypes.bool,
    theme: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { children, row, small, standard, theme, title } = this.props // eslint-disable-line no-shadow

    const contentClasses = classNames({
      [theme['card-content--default']]: (!standard && !small),
      [theme['card-content--standard']]: standard,
      [theme['card-content--small']]: (small && !standard),
      [theme['card-content--row']]: row
    })

    return (
      <div
        className={ contentClasses }
      >
        <div className={ theme['content-title'] }>
          { title }
        </div>
        { children }
      </div>
    )
  }
}

export default themr(CARD_CONTENT, cardContentTheme)(Card)
