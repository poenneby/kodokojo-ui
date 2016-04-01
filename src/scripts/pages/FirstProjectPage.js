import React, { Component } from 'react'

// UI
import Paper from 'material-ui/lib/paper'

import { centerPaper } from '../../styles/commons'
import Account from '../components/auth/Account'

class FirstProjectPage extends Component {
  render() {
    return (
      <div>
        <Paper style={centerPaper} zDepth={1}>
          <Account />
        </Paper>
      </div>
    )
  }
}

export default FirstProjectPage
