import React, { Component, PropTypes } from 'react'

// Component
import { centerPaper } from '../../styles/commons'
import ProjectConfigDetail from '../components/projectConfig/ProjectConfigDetail'

class ProjectConfigDetailPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ centerPaper }>
          <ProjectConfigDetail />
      </div>
    )
  }
}

export default ProjectConfigDetailPage
