import React, { Component, PropTypes } from 'react'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

// Component
import { BRICK } from '../../commons/identifiers'
import '../../../styles/_commons.less'
import brickTheme from './brick.scss'
import { getBrickStatus } from '../../services/param.service'

// TODO TU
// Brick component
export class Brick extends Component {

  static propTypes = {
    brick: PropTypes.object
  }

  handleLoadStatus(e) {
    e.target.classList.add(brickTheme['brick-status--loaded'])
  }

  render() {
    const { brick } = this.props // eslint-disable-line no-shadow
    const status = getBrickStatus(brick && brick.state ? brick.state : undefined)
    const brickClasses = classNames(brickTheme.brick, brickTheme['brick-item'])

    return (
      <div className={ brickClasses }>
        <div className={ brickTheme['brick-type'] }>
          { brick ? brick.type : '-' }
        </div>
        <div className={ brickTheme['brick-name'] }>
          { brick ? brick.name : '-' }
        </div>
        <div className={ brickTheme['brick-state'] }>
          <img
            className={ brickTheme['brick-status'] }
            onLoad={ this.handleLoadStatus }
            src={ status.image }
          />
        </div>
        <div className={ brickTheme['brick-version'] }>
          { brick ? brick.version : '-' }
        </div>
        <div className={ brickTheme['brick-link'] }>
          { brick && brick.url ?
            <a href={ brick.url }>{ brick.url }</a> :
            '-'
          }
        </div>
      </div>
    )
  }
}

export default themr(BRICK, brickTheme)(Brick)
