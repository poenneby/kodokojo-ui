import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'

// UI
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

import './projectConfigDetail.less'
import { fontSizeMedium } from '../../../styles/commons'
import { getProjectConfig } from './projectConfigActions'
import { emailValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'
import { addUserToProjectConfig } from './projectConfigActions'
import { User } from '../user/User'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// ProjectDetail component
export class ProjectDetail extends Component {

  static propTypes = {
    addUserToProjectConfig: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    getProjectConfig: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    projectConfig: PropTypes.object.isRequired,
    projectConfigId : PropTypes.string.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  // componentWillMount() {
  //   const { getProjectConfig, projectConfigId } = this.props
  //
  //   getProjectConfig(projectConfigId)
  // }

  handleSubmit = () => {
    const { fields: { email }, projectConfig, addUserToProjectConfig } = this.props

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    } else {
      if (nextEmail && nextEmail.trim()) {
        return addUserToProjectConfig(projectConfig.id, nextEmail.trim()
        ).then(
          Promise.resolve()
        ).catch(error => {
          return Promise.reject({ email: returnErrorKey('user', 'create-account', error.message) })
        })
      }
    }
  }

  render() {
    const { fields: { email }, projectConfig, users, handleSubmit, submitting } = this.props
    const { formatMessage }  = this.props.intl
    const owner = projectConfig.owner && projectConfig.owner.username ? projectConfig.owner.username : ''

    return (
      <Card>
        <CardHeader
          // avatar="http://lorempixel.com/100/100/abstract/"
          subtitle={ formatMessage({ id: 'project-config-owner-label' }) + `: ${owner}` }
          title={ projectConfig.name }
          titleStyle={ fontSizeMedium }
        />
        <CardText>
          <Table
            fixedHeader
            height="150px"
            selectable={ false }
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="User name">Module</TableHeaderColumn>
                <TableHeaderColumn tooltip="Role">Brick</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
            >
              { projectConfig.stack && projectConfig.stack[0] && projectConfig.stack[0].brickConfigs &&
              projectConfig.stack[0].brickConfigs.map((brick, index) => (
                <TableRow key={ index } selected={ brick.selected }>
                  <TableRowColumn>{ brick.type }</TableRowColumn>
                  <TableRowColumn>{ brick.name }</TableRowColumn>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <form id="addUserForm"
                name="addUserForm"
                noValidate
                onSubmit={ handleSubmit(this.handleSubmit) }
          >
            <TextField
              { ...email }
              errorText={ email.touched && email.error ? formatMessage({ id: email.error }, {fieldName: formatMessage({ id:'email-input-label' })}) : '' }
              floatingLabelText={ formatMessage({id: 'signin-email-label'}) }
              hintText={ formatMessage({id: 'signin-email-hint-label'}) }
              name="email"
              type="email"
            />
            <FlatButton
              className="form-submit"
              disabled={ submitting }
              label={ '+ Add a user' }
              primary
              type="submit"
            />
          </form>
          <Table
            fixedHeader
            height="300px"
            selectable={ false }
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="User name">User name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Role">Role</TableHeaderColumn>
                <TableHeaderColumn tooltip="Email address">Email address</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
            >
              { projectConfig.users &&
                projectConfig.users.map( (user, index) => (
                  <User
                    key={ user.identifer }
                    // TODO rename to user.identifier after backend fix & update
                    userId={ user.identifer }
                    users={users}
                  />
                ))
              }
              { !projectConfig.users &&
                <TableRow>
                  <TableRowColumn>no user...</TableRowColumn>
                  <TableRowColumn />
                  <TableRowColumn />
                </TableRow>
              }
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }

}

// ProjectDetail container
const mapStateProps = (state) => {
  return {
    projectConfig: state.project.projectConfig,
    users: state.users
  }
}

const ProjectDetailContainer = compose(
  reduxForm(
    {
      form: 'addUserForm',
      fields: ['email'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      addUserToProjectConfig,
      getProjectConfig
    }
  ),
  injectIntl
)(ProjectDetail)

export default ProjectDetailContainer