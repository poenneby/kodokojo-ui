import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
// import io from 'socket.io-client'

// Component
import api from '../../../config/shared/api.endpoints'
import { getToken } from '../services/authService'
import { centerPaper } from '../../styles/commons'

class ProjectDetailPage extends Component {

  static propTypes = {
    params : PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    this.socket = new WebSocket('ws://192.168.99.100:9080/api/v1/event')
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        entity: 'user',
        action: 'authentication',
        data: {
          authorization: `Basic ${getToken()}`
        }
      }))
    }

    this.socket.onmessage = (event) => {
      console.log(event.data)
    }
  }

  render() {
    const { params } = this.props

    return (
      <div style={ centerPaper }>
      </div>
    )
  }
}

// ProjectDetail container
const mapStateProps = (state) => {
  return {
    //
  }
}

const ProjectDetailPageContainer = compose(
  connect(
    mapStateProps
  ),
  injectIntl
)(ProjectDetailPage)

export default ProjectDetailPageContainer