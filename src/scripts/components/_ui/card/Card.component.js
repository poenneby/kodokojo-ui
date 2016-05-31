import React, { Component, PropTypes } from 'react'

// component
import './card.less'

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
    style: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const { children, className, style, title } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ `card${!className ? '' : ` ${className}`}` }
        style={ style }
      >
        { title &&
          <div className="card-title">
            { title }
          </div>
        }
        { children }
      </div>
    )
  }
}

export default Card
