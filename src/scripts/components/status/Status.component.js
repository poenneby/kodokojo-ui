import React, { Component, PropTypes } from 'react'
import { intlShape, injectIntl } from 'react-intl'

// component
import statusTheme from './status.scss'
import { getStatusByState } from '../../services/param.service'

export class Status extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    state: PropTypes.string
  }

  render() {
    const { state } = this.props
    const { formatMessage } = this.props.intl

    const status = getStatusByState(state)

    return (
      <img
        className={ statusTheme.status }
        onLoad={ (e) => e.target.classList.add(statusTheme['status--loaded']) }
        src={ status.image }
        title={ formatMessage({ id: `status-${status.label}-label` }) }
      />
    )
  }
}

export default injectIntl(Status)
