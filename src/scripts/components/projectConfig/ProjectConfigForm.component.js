import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'

// UI
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { createProjectConfig } from './projectConfig.actions'
import { projectNameValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'

// validation function
const validate = combineValidators({
  projectName: projectNameValidator('projectName')
})

// TODO TU
// ProjectConfigForm component
export class ProjectConfigForm extends Component {

  static propTypes = {
    createProjectConfig: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    submitting: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired
  }

  handleSubmit = () => {
    const { fields: { projectName }, userId, createProjectConfig } = this.props // eslint-disable-line no-shadow

    const nextProjectName = projectName.value
    const error = validate({ projectName: nextProjectName })

    if (error.projectName) {
      return Promise.reject({ projectName: error.email })
    }
    if (nextProjectName && nextProjectName.trim()) {
      return createProjectConfig(nextProjectName.trim(), userId)
        .then(Promise.resolve())
        .catch(err => Promise.reject({ projectName: returnErrorKey('project', 'config-create', err.message) }))
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { fields: { projectName, projectUsers }, handleSubmit, submitting } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <form id="projectForm"
            name="projectForm"
            onSubmit={ handleSubmit(this.handleSubmit) }
      >
        <TextField
          { ...projectName }
          errorText={
            projectName.touched && projectName.error ?
            formatMessage({ id: projectName.error }, { fieldName: formatMessage({ id: 'project-name-label' }) }) :
            ''
          }
          floatingLabelText={ formatMessage({ id: 'project-name-label' }) }
          hintText={ formatMessage({ id: 'project-name-hint-label' }) }
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
          label={ formatMessage({ id: 'project-config-create-button-label' }) }
          primary
          type="submit"
        /><br/>
      </form>
    )
  }
}

// ProjectConfigForm container
const mapStateProps = (state) => (
  {
    userId: state.auth.account && state.auth.account.id ? state.auth.account.id : ''
  }
)

const ProjectConfigFormContainer = compose(
  reduxForm(
    {
      form: 'projectForm',
      fields: ['projectName', 'projectUsers'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      createProjectConfig
    }
  ),
  injectIntl
)(ProjectConfigForm)

export default ProjectConfigFormContainer
