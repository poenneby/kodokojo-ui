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

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import Page from '../components/_ui/page/Page.component'
import Paragraph from '../components/_ui/page/Paragraph.component'
import Dialog from '../components/_ui/dialog/Dialog.component'
import Account from '../components/auth/Account.component'
import ProjectConfigForm from '../components/projectConfig/ProjectConfigForm.component'
import { setNavVisibility } from '../components/app/app.actions'
import { getBricks } from '../components/brick/brick.actions'

export class FirstProjectPage extends React.Component {

  static propTypes = {
    account: React.PropTypes.object,
    bricks: React.PropTypes.object,
    getBricks: React.PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    setNavVisibility: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { isAccountActive: true }
  }

  componentWillMount() {
    const { getBricks } = this.props // eslint-disable-line no-shadow

    this.initNav()

    // refresh available bricks
    getBricks()
  }

  componentWillUnmount() {
    // TODO dispatch action that clean auth from sensitive infos (password, ssh keys)
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(false)
  }

  handleClose = () => {
    this.setState({
      isAccountActive: false
    })
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
    <Page>
      <h1 className={ utilsTheme['secondary-color--1'] }>
        <FormattedMessage id={'project-create-label'} />
      </h1>
      <Paragraph>
        <Dialog
          actions={[
            { label: formatMessage({ id: 'close-label' }), onClick: this.handleClose }
          ]}
          active={ this.state.isAccountActive }
          onEscKeyDown={ this.handleClose }
          onOverlayClick={ this.handleClose }
          title={ formatMessage({ id: 'account-label' }) }
        >
          <Account />
        </Dialog>
        <ProjectConfigForm />
      </Paragraph>
    </Page>
    )
  }
}

// FirstProjectPage container
const mapStateProps = (state, ownProps) => (
  {
    location: ownProps.location,
    bricks: state.bricks
  }
)

const FirstProjectContainer = compose(
  connect(
    mapStateProps,
    {
      getBricks,
      setNavVisibility
    }
  ),
  injectIntl
)(FirstProjectPage)

export default FirstProjectContainer
