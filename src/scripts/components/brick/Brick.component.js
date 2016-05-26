import React, { Component, PropTypes } from 'react'

// Component
import './brick.less'
import { getBrickStatus } from '../../services/param.service'

// TODO TU
// Brick component
export class Brick extends Component {

  static propTypes = {
    brick: PropTypes.object
  }

  handleLoadStatus(e) {
    e.target.classList.add('brick-status--loaded')
  }

  render() {
    const { brick } = this.props // eslint-disable-line no-shadow
    const status = getBrickStatus(brick && brick.state ? brick.state : undefined)

    return (
      <div className="brick brick-item">
        <div className="brick-column brick-type">
          { brick ? brick.type : '-' }
        </div>
        <div className="brick-column brick-name">
          { brick ? brick.name : '-' }
        </div>
        <div className="brick-column brick-state" >
          <img
            className="brick-status"
            onLoad={ this.handleLoadStatus }
            src={ status.image }
          />
        </div>
        <div className="brick-column brick-version">
          { brick ? brick.version : '-' }
        </div>
        <div className="brick-column brick-link">
          { brick && brick.url ?
            <a href={ brick.url }>{ brick.url }</a> :
            '-'
          }
        </div>
      </div>
    )
  }
}

export default Brick
