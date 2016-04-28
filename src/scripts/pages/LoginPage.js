import React, { Component } from 'react'

// UI
import Paper from 'material-ui/paper'

// Component
import { centerPaper } from '../../styles/commons'
import Login from '../components/auth/Login'

class LoginPage extends Component {
  render() {
    return (
        <div>
          <Paper
            className="center"
            style={ centerPaper }
            zDepth={1}
          >
            <Login/>
          </Paper>
        </div>
    )
  }
}

export default LoginPage