import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import Promise from 'bluebird'

// Component
import Page from '../components/_ui/page/Page.component'
import User from '../components/user/User.component'
import Avatar from '../components/_ui/avatar/Avatar.component'
import { setNavVisibility } from '../components/app/app.actions'
import { updateMenuPath } from '../components/menu/menu.actions'
import { getProjectConfig } from '../components/projectConfig/projectConfig.actions'

export class MembersPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.string,
    members: PropTypes.array,
    projectConfigId: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired,
    updateMenuPath: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { location, members, projectConfigId, updateMenuPath } = this.props // eslint-disable-line no-shadow

    this.initNav()

    const getProjectConfigPromise = Promise.promisify(getProjectConfig(projectConfigId))

    if (!members && projectConfigId) {
      getProjectConfigPromise(projectConfigId)
        .then(() => {
          updateMenuPath(location.pathname)
        })
    } else if (members) {
      updateMenuPath(location.pathname)
    } else if (!projectConfigId) {
      // TODO no projectConfigId case
    }
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(true)
  }

  render() {
    const { members } = this.props

    return (
      <Page>
        <h1 className="secondary-color--2">
          <FormattedMessage id={'members-label'} />
        </h1>
        <div className="paragraph">
          <div
            className="user user-header"
          >
            <div
              className="user-column user-name"
            >
              <Avatar />
              <FormattedMessage id={'name-label'} />
            </div>
            <div className="user-column user-username">
              <FormattedMessage id={'username-label'} />
            </div>
            <div className="user-column user-group">
              <FormattedMessage id={'group-label'} />
            </div>
            <div className="user-column user-email">
              <FormattedMessage id={'email-label'} />
            </div>
          </div>
          { members && members.length &&
            members.map((userId, index) => (
              <User
                key={ index }
                userId={ userId }
              />
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
    members: state.projectConfig.users
  }
)

const MembersPageContainer = compose(
  connect(
    mapStateProps,
    {
      getProjectConfig,
      setNavVisibility,
      updateMenuPath
    }
  ),
  injectIntl
)(MembersPage)


export default MembersPageContainer
