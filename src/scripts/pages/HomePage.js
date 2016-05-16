import React, { Component } from 'react'

// UI
import Paper from 'material-ui/Paper'

// Component
import { centerPaper } from '../../styles/commons'
import Signup from '../components/signup/Signup.component'

class HomePage extends Component {
  render() {
    return (
      <div>
        <Paper
          className="center"
          style={ centerPaper }
          zDepth={1}
        >
          <Signup />
        </Paper>
      </div>
    )
  }
}

export default HomePage
