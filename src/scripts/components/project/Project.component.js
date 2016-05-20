import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl } from 'react-intl'

// UI
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'

// Component
import { fontSizeMedium } from '../../../styles/commons'
import { updateProject } from './project.actions'
import { mapBrickEvent } from '../../services/mappingService'
import websocketService from '../../services/websocketService'

class Project extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    projectConfig: PropTypes.object,
    updateProject: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    const { updateProject } = this.props // eslint-disable-line no-shadow

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
            console.log(socketEventData)
            updateProject(mapBrickEvent(socketEventData))
          }
        }
      })
  }

  componentWillUnmount = () => {
    // TODO pass userName to stop method
    websocketService.stop()
  }

  render() {
    const { projectConfig } = this.props // eslint-disable-line no-shadow
    let name
    if (projectConfig) {
      name = projectConfig.name
    }

    return (
      <Card>
        <CardHeader
          title={ name }
          titleStyle={ fontSizeMedium }
        />
        <CardText>
          { projectConfig.stacks && projectConfig.stacks[0] && projectConfig.stacks[0].bricks &&
            projectConfig.stacks[0].bricks.map((brick, index) => (
              <div key={index} style={{ paddingTop: '.5em' }}>
                { brick.type } : { brick.name } > { brick.state || 'UNDEFINED' }
                { brick.url &&
                  <div><a href={brick.url} target="_blank">{brick.url}</a></div>
                }
              </div>
            ))
          }
        </CardText>
      </Card>
    )
  }
}

// ProjectDetail container
const mapStateProps = (state) => (
  {
    projectConfig: state.projectConfig
  }
)

// const mergeProps = (stateProps, dispatchProps, ownProps) => (
//   {
//     ...ownProps,
//     user: stateProps.users[ownProps.userId]
//   }
// )

const ProjectContainer = compose(
  connect(
    mapStateProps,
    {
      updateProject
    }
    // mergeProps
  ),
  injectIntl
)(Project)

export default ProjectContainer
