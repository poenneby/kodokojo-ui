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
import { mapBrickEvents } from '../../services/mappingService'
import websocketService from '../../services/websocketService'

class Project extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    project: PropTypes.object,
    updateProject: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    const { updateProject } = this.props

    // TODO let the dev backend reroute ws calls
    // maybe with https://www.npmjs.com/package/express-ws
    // this.socket = new WebSocket('ws://localhost/api/v1/event')
    this.socket = websocketService
      .initSocket('ws://192.168.99.100:9080/api/v1/event')
      .then(socket => {
        this.socket = socket
        this.socket.onmessage = (event) => {
          event = JSON.parse(event.data)
          if(event.entity === 'brick' && event.action === 'updateState') {
            console.log(event)
            updateProject(mapBrickEvents(event))
          }
        }
      })
  }

  componentWillUnmount = () => {
    // TODO pass userName to stop method
    websocketService.stop()
  }

  render() {
    const { project } = this.props
    const { formatMessage }  = this.props.intl
    let owner,
        name
    if (project) {
      // FIXME admins is now an array
      owner = project.admins[0].userName
      name = project.name
    }

    return (
      <Card>
        <CardHeader
          subtitle={ formatMessage({ id: 'project-config-owner-label' }) + `: ${owner}` }
          title={ name }
          titleStyle={ fontSizeMedium }
        />
        <CardText>
          { project.stacks && project.stacks[0] && project.stacks[0].bricks &&
          project.stacks[0].bricks.map((brick, index) => (
            <div key={index} style={{ paddingTop: '.5em' }}>
              { brick.type } : { brick.name } > { brick.state || 'UNDEFINED' }
              { brick.url &&
                <div><a href={brick.url} target="_blank">{brick.url}</a></div>
              }
            </div>
          ))}
        </CardText>
      </Card>
    )
  }
}

// ProjectDetail container
const mapStateProps = (state) => {
  return {
    project: state.project
  }
}

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   return {
//     ...ownProps,
//     user: stateProps.users[ownProps.userId]
//   }
// }

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