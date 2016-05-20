import React, { Component, PropTypes } from 'react'

// Component
import { centerPaper } from '../../styles/commons'
import ProjectConfig from '../components/projectConfig/ProjectConfig.component'

class ProjectConfigPage extends Component {

  render() {
    return (
      <div style={ centerPaper }>
          <ProjectConfig />
      </div>
    )
  }
}

export default ProjectConfigPage
