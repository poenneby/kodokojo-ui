import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import Page from '../components/_ui/page/Page.component'
import Card from '../components/_ui/card/Card.component'
import Account from '../components/auth/Account.component.js'
import ProjectConfigForm from '../components/projectConfig/ProjectConfigForm.component'
import { setNavVisibility } from '../components/app/app.actions'
import { getBricks } from '../components/brick/brick.actions'

export class FirstProjectPage extends Component {

  static propTypes = {
    getBricks: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    setNavVisibility: PropTypes.func.isRequired
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

  render() {
    return (
    <Page>
      <h1 className={ utilsTheme['secondary-color--1'] }>
        <FormattedMessage id={'project-create-label'} />
      </h1>
      <div className="paragraph">
        <div style={{ display: 'flex', flexFlow: 'row wrap', marginBottom: '10px' }}>
          <Card>
            <Account />
          </Card>
        </div>
        <ProjectConfigForm />
      </div>
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
