import React, { Component } from 'react'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import Card from '../components/_ui/card/Card.component'
import CardContent from '../components/_ui/card/CardContent.component'
import Login from '../components/login/Login.component.js'

class LoginPage extends Component {
  render() {
    return (
      <div
        className={ utilsTheme['content-centered'] }
        style={{ margin: '40px', display: 'flex', flexDirection: 'row' }}
      >
        <Card>
          <Login/>
        </Card>
      </div>
    )
  }
}

export default LoginPage
