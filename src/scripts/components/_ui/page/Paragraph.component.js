import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'

// component
import { PARAGRAPH } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import paragraphTheme from './paragraph.scss'

/**
 * UI: Paragraph component
 *
 */
export const Paragraph = ({ children, theme }) => (
  <div
    className={ theme.paragraph }
  >
    { children }
  </div>
)

Paragraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node
  ]),
  theme: PropTypes.object
}

export default themr(PARAGRAPH, paragraphTheme)(Paragraph)
