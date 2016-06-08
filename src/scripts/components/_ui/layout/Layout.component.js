import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { LAYOUT } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import layoutTheme from './layout.scss'

/**
 * UI: Layout component
 *
 */
export class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]),
    theme: PropTypes.theme
  }

  render() {
    const { children, theme } = this.props // eslint-disable-line no-shadow

    return (
      <div className={ theme.layout }>
        { children }
      </div>
    )
  }
}

export default themr(LAYOUT, layoutTheme)(Layout)
