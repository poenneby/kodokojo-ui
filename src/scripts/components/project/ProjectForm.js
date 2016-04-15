import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { composeValidators, combineValidators, isRequired } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'

// UI
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import { createProjectConfig } from './projectActions'
import { projectNameValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'

// validation function
const validate = combineValidators({
  projectName: projectNameValidator('projectName')
})

// ProjectForm component 
export class ProjectForm extends Component {
  
  static propTypes = {
    createProjectConfig: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    submitting: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
  }
  
  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    const { fields: { projectName }, userId, createProjectConfig } = this.props

    const nextProjectName = projectName.value
    const error = validate({ projectName: nextProjectName })
    if (error.projectName) {
      return Promise.reject({ projectName: error.email })
    } else {
      if (nextProjectName && nextProjectName.trim()) {
        return createProjectConfig(nextProjectName.trim(), userId
        ).then(
          Promise.resolve()
        ).catch( error => {
          return Promise.reject({ projectName: returnErrorKey('project', 'config-create', error.message) })
        })
      }
    }
  }

  render() {
    const { fields: { projectName, projectUsers }, handleSubmit, submitting  } = this.props
    const { formatMessage }  = this.props.intl

    return (
      <form id="projectForm"
            name="projectForm"
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <TextField
          { ...projectName }
          errorText={ projectName.touched && projectName.error ? formatMessage({id: projectName.error}, {fieldName: formatMessage({id:'project-name-label'})}) : '' }
          floatingLabelText={ formatMessage({id:'project-name-label'}) }
          hintText={ formatMessage({id:'project-name-hint-label'}) }
          name="projectName"
          type="text"
        /><br />
        <input
          {...projectUsers}
          id="projectUsers"
          name="projectUsers"
          type="hidden"
        />
        <RaisedButton
          className="form-submit"
          disabled={submitting}
          label={ formatMessage({id:'project-config-create-button-label'}) }
          primary
          type="submit"
        /><br/>
      </form>
    )
  }
}

// ProjectForm container
const mapStateProps = (state) => {
  return {
    userId: state.auth.account.id
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    createProjectConfig: (projectName, projectOwner, projectUsers) => dispatch(createProjectConfig(projectName, projectOwner, projectUsers))
  }
}

const ProjectFormContainer = compose(
  reduxForm(
    {
      form: 'projectForm',
      fields: ['projectName', 'projectUsers'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    mapDispatchProps
  ),
  injectIntl
)(ProjectForm)

export default ProjectFormContainer