import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Component
import Page from '../components/_ui/page/Page.component'
import Brick from '../components/brick/Brick.component'
import { mapBrickEvent } from '../services/mappingService'
import websocketService from '../services/websocketService'
import { updateProject } from '../components/project/project.actions'
import { getProjectConfig } from '../components/projectConfig/projectConfig.actions'

export class StacksPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    projectConfigId: PropTypes.string,
    stacks: PropTypes.array,
    updateProject: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    const { stacks, projectConfigId } = this.props // eslint-disable-line no-shadow

    if (!stacks && projectConfigId) {
      getProjectConfig(projectConfigId)
    }

    // TODO no projectConfigId case

    this.initWebsocket()
  }

  componentWillUnmount = () => {
    // TODO pass userName to stop method
    websocketService.stopSocket()
  }

  initWebsocket = () => {
    // TODO let the dev backend reroute ws calls
    // maybe with https://www.npmjs.com/package/express-ws
    // this.socket = new WebSocket('ws://localhost/api/v1/event')
    this.socket = websocketService
      .initSocket('ws://192.168.99.100:9080/api/v1/event')
      .then(socket => {
        this.socket = socket
        this.socket.onmessage = (socketEvent) => {
          const socketEventData = JSON.parse(socketEvent.data)
          if (socketEventData.entity === 'brick' && socketEventData.action === 'updateState') {
            console.log('wsEvent', socketEventData)
            updateProject(mapBrickEvent(socketEventData))
          }
        }
      })
  }

  render() {
    const { stacks } = this.props

    return (
      <Page>
        <h1 className="contextual-color--1">
          <FormattedMessage id={'stacks-label'} />
        </h1>
        <div className="paragraph">
          <div className="brick brick-header">
            <div className="brick-column brick-type">
              <FormattedMessage id={ 'type-label' } />
            </div>
            <div className="brick-column brick-name">
              <FormattedMessage id={ 'name-label' } />
            </div>
            <div className="brick-column brick-state" >
              <FormattedMessage id={ 'status-label' } />
            </div>
            <div className="brick-column brick-version">
              <FormattedMessage id={ 'version-label' } />
            </div>
            <div className="brick-column brick-link">
              <FormattedMessage id={ 'link-label' } />
            </div>
          </div>
          { stacks && stacks[0] && stacks[0].bricks &&
            stacks[0].bricks.map((brick, index) => (
              <Brick brick={ brick } key={ index } />
            ))
          }
        </div>
      </Page>
    )
  }
}

// StacksPage container
const mapStateProps = (state) => (
  {
    projectConfigId: state.projectConfig.id,
    stacks: state.projectConfig.stacks
  }
)

const StacksPageContainer = compose(
  connect(
    mapStateProps,
    {
      getProjectConfig,
      updateProject
    }
  ),
  injectIntl
)(StacksPage)


export default StacksPageContainer
