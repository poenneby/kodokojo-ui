import React, { Component } from 'react'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import Paper from 'material-ui/lib/paper'

// Component
import { centerPaper } from '../../styles/commons'
import Account from '../components/auth/Account'
import ProjectConfigForm from '../components/projectConfig/ProjectConfigForm'

class FirstProjectPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  }

  componentWillUnmount() {
    // TODO dispatch action that clean account from sensitive infos (password, ssh keys)
  }

  render() {
    return (
      <div>
        <Paper
          className="center"
          style={ centerPaper }
          zDepth={1}
        >
          <Account />
        </Paper>
        <Paper
          className="center"
          style={ centerPaper }
          zDepth={1}
        >
          <FormattedMessage id={'project-config-intro-text'} />
          <ProjectConfigForm/>
        </Paper>
      </div>
    )
  }
}

export default injectIntl(FirstProjectPage)
