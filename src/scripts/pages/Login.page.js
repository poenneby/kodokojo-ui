import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import Promise from 'bluebird'
import { browserHistory } from 'react-router'

// Component
import '../../styles/_commons.less'
import Card from '../components/_ui/card/Card.component'
import CardContent from '../components/_ui/card/CardContent.component'
import CardContainer from '../components/_ui/card/CardContainer.component'
import Button from '../components/_ui/button/Button.component'
import Login from '../components/login/Login.component.js'
import { setNavVisibility } from '../components/app/app.actions'
import { login } from '../components/login/login.actions'

class LoginPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object.isRequired,
    login: PropTypes.func,
    setNavVisibility: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    const { isAuthenticated, login } = this.props // eslint-disable-line no-shadow

    this.initNav()

    if (isAuthenticated) {
      return login()
        .catch(err => err)
    }
    return Promise.resolve()
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
          merged
          style={{ width: '400px', height: '370px', overflow: 'hidden' }}
          title={ formatMessage({ id: 'signup-title-label' }) }
        >
          <CardContent>
            <p>
              <FormattedMessage id={'login-to-signup-text'}/>
            </p>
            <div>
              <Button
                label={ formatMessage({ id: 'signup-label' }) }
                onClick={ () => browserHistory.push('/') }
                title={ formatMessage({ id: 'signup-label' }) }
              />
            </div>
          </CardContent>
        </Card>
        <Card
          merged
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
    isAuthenticated: state.auth.isAuthenticated,
    location: ownProps.location
  }
)

const LoginPageContainer = compose(
  connect(
    mapStateProps,
    {
      login,
      setNavVisibility
    }
  ),
  injectIntl
)(LoginPage)

export default LoginPageContainer

