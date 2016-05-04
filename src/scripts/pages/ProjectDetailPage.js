import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'

// Component
import { centerPaper } from '../../styles/commons'
import Project from '../components/project/Project'

class ProjectDetailPage extends Component {


  render() {
    return (
      <div style={ centerPaper }>
        <Project />
      </div>
    )
  }
}


const ProjectDetailPageContainer = injectIntl(ProjectDetailPage)

export default ProjectDetailPageContainer