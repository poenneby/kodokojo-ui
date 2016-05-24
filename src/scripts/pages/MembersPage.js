import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Component
import Page from '../components/_ui/page/Page.component'
import User from '../components/user/User.component'
import Avatar from '../components/_ui/avatar/Avatar.component'
import { getProjectConfig } from '../components/projectConfig/projectConfig.actions'

export class MembersPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    members: PropTypes.array,
    projectConfigId: PropTypes.string
  }

  componentWillMount() {
    const { members, projectConfigId } = this.props // eslint-disable-line no-shadow

    if (!members && projectConfigId) {
      getProjectConfig(projectConfigId)
    } else {
      // TODO
    }
  }

  render() {
    const { members } = this.props

    return (
      <Page>
        <h1 className="contextual-color--2">
          <FormattedMessage id={'members-label'} />
        </h1>
        <div className="paragraph">
          <div
            className="user user-header"
          >
            <div
              className="user-column"
            >
              <Avatar />
              <FormattedMessage id={'name-label'} />
            </div>
            <div className="user-column">
              <FormattedMessage id={'username-label'} />
            </div>
            <div className="user-column">
              <FormattedMessage id={'group-label'} />
            </div>
            <div className="user-column">
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

// MembersPage container
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
      getProjectConfig
    }
  ),
  injectIntl
)(MembersPage)


export default MembersPageContainer
