/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import brickTheme from '../components/brick/brick.scss'
import Page from '../components/_ui/page/Page.component'
import Paragraph from '../components/_ui/page/Paragraph.component'
import Brick from '../components/brick/Brick.component'
import { setNavVisibility } from '../components/app/app.actions'
// import { updateProject } from '../components/project/project.actions'
import { getProjectConfig, getProjectConfigAndProject } from '../components/projectConfig/projectConfig.actions'

export class StacksPage extends Component {

  static propTypes = {
    getProjectConfig: PropTypes.func,
    getProjectConfigAndProject: PropTypes.func,
    intl: intlShape.isRequired,
    projectConfigId: PropTypes.string,
    projectId: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired,
    stacks: PropTypes.array
  }

  componentWillMount = () => {
    const { getProjectConfig, getProjectConfigAndProject, projectConfigId, projectId } = this.props // eslint-disable-line no-shadow

    this.initNav()
    if (projectConfigId && !projectId) {
      getProjectConfig(projectConfigId)
    } else if (projectConfigId && projectId) {
      getProjectConfigAndProject(projectConfigId, projectId)
    } else if (!projectConfigId) {
      // TODO no projectConfigId case
    }
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(true)
  }

  render() {
    const { stacks } = this.props // eslint-disable-line no-shadow
    const brickClasses = classNames(brickTheme.brick, brickTheme['brick-header'])

    return (
      <Page>
        <h1 className={ utilsTheme['secondary-color--1'] }>
          <FormattedMessage id={'stacks-label'} />
        </h1>
        <Paragraph>
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
        </Paragraph>
      </Page>
    )
  }
}

// StacksPage container
const mapStateProps = (state, ownProps) => (
  {
    location: ownProps.location,
    projectConfigId: state.projectConfig ? state.projectConfig.id : '',
    projectId: state.projectConfig && state.projectConfig.project ? state.projectConfig.project.id : '',
    stacks: state.projectConfig.stacks
  }
)

const StacksPageContainer = compose(
  connect(
    mapStateProps,
    {
      getProjectConfig,
      getProjectConfigAndProject,
      setNavVisibility
    }
  ),
  injectIntl
)(StacksPage)


export default StacksPageContainer
