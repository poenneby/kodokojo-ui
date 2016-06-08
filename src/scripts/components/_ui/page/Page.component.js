import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { PAGE } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import pageTheme from './page.scss'

/**
 * UI: Page component
 *
 */
export class Page extends Component {

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
      <section
        className={ theme.page }
      >
        { children }
      </section>
    )
  }
}

export default themr(PAGE, pageTheme)(Page)
