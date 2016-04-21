import React, { Component } from 'react'

// UI
import Paper from 'material-ui/lib/paper'

// Component
import { centerPaper } from '../../styles/commons'
import Signin from '../components/auth/Signin'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Paper
          className="center"
          style={ centerPaper }
          zDepth={1}
        >
          <Signin />
        </Paper>
      </div>
    )
  }
}

export default HomePage
