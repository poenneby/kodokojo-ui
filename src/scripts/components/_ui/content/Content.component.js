import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { CONTENT } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import contentTheme from './content.scss'

/**
 * UI: Content component
 *
 */
export class Content extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  render() {
    const { children } = this.props // eslint-disable-line no-shadow

    return (
      <div
        className={ contentTheme.content }
      >
        { children }
      </div>
    )
  }
}

export default themr(CONTENT, contentTheme)(Content)
