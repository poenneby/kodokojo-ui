import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import Page from '../components/_ui/page/Page.component'
import Paragraph from '../components/_ui/page/Paragraph.component'
import Dialog from '../components/_ui/dialog/Dialog.component'
import Account from '../components/auth/Account.component.js'
import ProjectConfigForm from '../components/projectConfig/ProjectConfigForm.component'
import { setNavVisibility } from '../components/app/app.actions'
import { getBricks } from '../components/brick/brick.actions'

export class FirstProjectPage extends Component {

  static propTypes = {
    account: PropTypes.object,
    bricks: PropTypes.object,
    getBricks: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    setNavVisibility: PropTypes.func.isRequired
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
        <div style={{ display: 'flex', flexFlow: 'row wrap', marginBottom: '10px' }}>
          <Dialog
            actions={[
              { label: 'Close', onClick: this.handleClose }
            ]}
            active={ this.state.isAccountActive }
            onEscKeyDown={ this.handleClose }
            onOverlayClick={ this.handleClose }
            title={ formatMessage({ id: 'account-label' }) }
          >
            <Account />
          </Dialog>
        </div>
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
