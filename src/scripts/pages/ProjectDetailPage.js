import React, { Component } from 'react'

// UI
import Paper from 'material-ui/lib/paper'

import { centerPaper } from '../../styles/commons'

class ProjectDetailPage extends Component {
  render() {
    return (
      <div>
        <Paper style={ centerPaper } zDepth={1}>
          project details
        </Paper>
      </div>
    )
  }
}

export default ProjectDetailPage