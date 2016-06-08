import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { PANEL } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import panelTheme from './panel.scss'

/**
 * UI: Panel component
 *
 */
export class Panel extends Component {

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
      <div
        className={ theme.panel }
      >
        { children }
      </div>
    )
  }
}

export default themr(PANEL, panelTheme)(Panel)
