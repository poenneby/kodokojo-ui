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

import './projectDetail.less'
import { fontSizeMedium } from '../../../styles/commons'
import { getProjectConfig } from './projectActions'
import { emailValidator } from '../../services/validatorService'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// ProjectDetail component
export class ProjectDetail extends Component {

  static propTypes = {
    getProjectConfig: PropTypes.func.isRequired,
    projectConfig: PropTypes.object.isRequired,
    projectConfigId : PropTypes.string.isRequired,
    intl: intlShape.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getProjectConfig, projectConfigId } = this.props

    getProjectConfig(projectConfigId)
  }

  render() {
    const { fields: { email }, projectConfig } = this.props
    const { formatMessage }  = this.props.intl
    const owner = projectConfig.owner && projectConfig.owner.username ? projectConfig.owner.username : ''

    return (
      <Card>
        <CardHeader
          avatar="http://lorempixel.com/100/100/abstract/"
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
              projectConfig.stack[0].brickConfigs.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.type}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <form name="addUserForm" style={{
            display: 'table-cell',
            verticalAlign: 'middle'

          }}>
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
              disabled={ false }
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
                projectConfig.users.map( (row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{row.username}</TableRowColumn>
                    <TableRowColumn>{row.role}</TableRowColumn>
                    <TableRowColumn>{row.email}</TableRowColumn>
                  </TableRow>
                ))
              }
              { !projectConfig.users &&
                <TableRow>
                  <TableRowColumn>no user...</TableRowColumn>
                  <TableRowColumn></TableRowColumn>
                  <TableRowColumn></TableRowColumn>
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
    projectConfig: state.project.projectConfig
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    getProjectConfig: (projectConfigId) => dispatch(getProjectConfig(projectConfigId))
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
    mapDispatchProps
  ),
  injectIntl
)(ProjectDetail)

export default ProjectDetailContainer