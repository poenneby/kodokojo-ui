import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

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
    const { children, theme } = this.props // eslint-disable-line no-shadow

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
