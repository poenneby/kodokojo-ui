import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { browserHistory } from 'react-router'

// Component
import '../../styles/_commons.less'
import Card from '../components/_ui/card/Card.component'
import CardContent from '../components/_ui/card/CardContent.component'
import CardContainer from '../components/_ui/card/CardContainer.component'
import Button from '../components/_ui/button/Button.component'
import Login from '../components/login/Login.component.js'
import { setNavVisibility } from '../components/app/app.actions'

class LoginPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    projectConfigId: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    this.initNav()
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(false)
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
      <CardContainer>
        <Card
          style={{ width: '400px', height: '370px', overflow: 'hidden' }}
          title={ formatMessage({ id: 'signup-title-label' }) }
        >
          <CardContent>
            <p>
              <FormattedMessage id={'signup-to-login-text'}/>
            </p>
            <Button
              label={ formatMessage({ id: 'signup-label' }) }
              onClick={ () => browserHistory.push('/') }
              title={ formatMessage({ id: 'signup-label' }) }
            />
          </CardContent>
        </Card>
        <Card
          primary
          style={{ width: '400px', height: '370px', overflow: 'hidden' }}
          title={ formatMessage({ id: 'login-title-label' }) }
        >
          <CardContent>
            <Login/>
          </CardContent>
        </Card>
      </CardContainer>
    )
  }
}

// LoginPage container
const mapStateProps = (state, ownProps) => (
  {
    location: ownProps.location,
    projectConfigId: state.projectConfig.id,
    projectConfigName: state.projectConfig.name,
    stacks: state.projectConfig.stacks
  }
)

const LoginPageContainer = compose(
  connect(
    mapStateProps,
    {
      setNavVisibility
    }
  ),
  injectIntl
)(LoginPage)

export default LoginPageContainer

