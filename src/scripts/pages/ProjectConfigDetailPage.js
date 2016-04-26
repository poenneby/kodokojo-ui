import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'

// Component
import { centerPaper } from '../../styles/commons'
import ProjectDetail from '../components/projectConfig/ProjectConfigDetail'

class ProjectDetailPage extends Component {

  static propTypes = {
    params : PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { params } = this.props

    return (
      <div style={ centerPaper }>
          <ProjectDetail projectConfigId={params.projectConfigId} />
      </div>
    )
  }
}

// ProjectDetail container
const mapStateProps = (state) => {
  return {
   //
  }
}

const ProjectDetailPageContainer = compose(
  connect(
    mapStateProps
  ),
  injectIntl
)(ProjectDetailPage)

export default ProjectDetailPageContainer
