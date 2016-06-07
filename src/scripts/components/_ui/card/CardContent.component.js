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
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ cardContentTheme['card-content'] }
      >
        { children }
      </div>
    )
  }
}

export default themr(CARD_CONTENT, cardContentTheme)(Card)