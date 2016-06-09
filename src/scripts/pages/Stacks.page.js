import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import Promise from 'bluebird'
import classNames from 'classnames'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import brickTheme from '../components/brick/brick.scss'
import Page from '../components/_ui/page/Page.component'
import Brick from '../components/brick/Brick.component'
import { mapBrickEvent } from '../services/mapping.service'
import websocketService from '../services/websocket.service'
import { setNavVisibility } from '../components/app/app.actions'
import { updateMenuPath } from '../components/menu/menu.actions'
import { updateProject } from '../components/project/project.actions'
import { getProjectConfig } from '../components/projectConfig/projectConfig.actions'

export class StacksPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    projectConfigId: PropTypes.string,
    projectConfigName: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired,
    stacks: PropTypes.array,
    updateMenuPath: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = undefined
  }

  componentWillMount = () => {
    const { location, projectConfigId, stacks, updateMenuPath } = this.props // eslint-disable-line no-shadow

    this.initNav()
    this.initWebsocket()

    const getProjectConfigPromise = Promise.promisify(getProjectConfig(projectConfigId))

    if (!stacks && projectConfigId) {
      getProjectConfigPromise(projectConfigId)
        .then(() => {
          updateMenuPath(location.pathname)
        })
    } else if (stacks) {
      updateMenuPath(location.pathname)
    } else if (!projectConfigId) {
      // TODO no projectConfigId case
    }
  }

  componentWillUnmount = () => {
    // TODO pass userName to stop method
    websocketService.stopSocket()
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(true)
  }

  initWebsocket = () => {
    // TODO let the dev backend reroute ws calls
    // TODO dynamically set the ws url (end point?)
    // TODO move this to actions
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
    const { stacks } = this.props // eslint-disable-line no-shadow
    const brickClasses = classNames(brickTheme.brick, brickTheme['brick-header'])

    return (
      <Page>
        <h1 className={ utilsTheme['secondary-color--1'] }>
          <FormattedMessage id={'stacks-label'} />
        </h1>
        <div className="paragraph">
          <div className={ brickClasses }>
            <div className={ brickTheme['brick-type'] }>
              <FormattedMessage id={ 'type-label' } />
            </div>
            <div className={ brickTheme['brick-name'] }>
              <FormattedMessage id={ 'name-label' } />
            </div>
            <div className={ brickTheme['brick-state'] }>
              <FormattedMessage id={ 'status-label' } />
            </div>
            <div className={ brickTheme['brick-version'] }>
              <FormattedMessage id={ 'version-label' } />
            </div>
            <div className={ brickTheme['brick-link'] }>
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
const mapStateProps = (state, ownProps) => (
  {
    location: ownProps.location,
    projectConfigId: state.projectConfig.id,
    projectConfigName: state.projectConfig.name,
    stacks: state.projectConfig.stacks
  }
)

const StacksPageContainer = compose(
  connect(
    mapStateProps,
    {
      getProjectConfig,
      updateProject,
      setNavVisibility,
      updateMenuPath
    }
  ),
  injectIntl
)(StacksPage)


export default StacksPageContainer
