import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'

// Component
import '../../styles/_commons.less'
import utilsTheme from '../../styles/_utils.scss'
import userTheme from '../components/user/user.scss'
import Page from '../components/_ui/page/Page.component'
import Paragraph from '../components/_ui/page/Paragraph.component'
import Action from '../components/_ui/page/Action.component'
import User from '../components/user/User.component'
import Avatar from '../components/_ui/avatar/Avatar.component'

import Button from '../components/_ui/button/Button.component'
import Input from '../components/_ui/input/Input.component'

import { setNavVisibility } from '../components/app/app.actions'
import { updateMenuPath } from '../components/menu/menu.actions'
import { addUserToProjectConfig, getProjectConfig } from '../components/projectConfig/projectConfig.actions'
import { emailValidator } from '../services/validator.service'
import { returnErrorKey } from '../services/error.service'


// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// MembersPage component
export class MembersPage extends Component {

  static propTypes = {
    addUserToProjectConfig: PropTypes.func,
    fields: PropTypes.object.isRequired,
    getProjectConfig: PropTypes.func,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    members: PropTypes.array,
    projectConfigId: PropTypes.string,
    setNavVisibility: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    updateMenuPath: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { getProjectConfig, location, members, projectConfigId, updateMenuPath } = this.props // eslint-disable-line no-shadow

    this.initNav()

    if (!members && projectConfigId) {
      getProjectConfig(projectConfigId)
        .then(() => {
          updateMenuPath(location.pathname)
        })
    } else if (members) {
      updateMenuPath(location.pathname)
    } else if (!projectConfigId) {
      // TODO no projectConfigId case
    }
  }

  initNav = () => {
    const { setNavVisibility } = this.props // eslint-disable-line no-shadow

    setNavVisibility(true)
  }

  handleSubmit = () => {
    const { fields: { email }, addUserToProjectConfig, projectConfigId } = this.props // eslint-disable-line no-shadow

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    }
    if (nextEmail && nextEmail.trim()) {
      return addUserToProjectConfig(projectConfigId, nextEmail.trim())
        .then(Promise.resolve())
        .catch(err => Promise.reject({ email: returnErrorKey(
          {
            component: 'email',
            code: err.message
          })
        }))
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { fields: { email }, handleSubmit, submitting, members } = this.props
    const { formatMessage } = this.props.intl

    const userClasses = classNames(userTheme.user, userTheme['user-header'])

    return (
      <Page>
        <h1 className={ utilsTheme['secondary-color--2'] }>
          <FormattedMessage id={'members-label'} />
        </h1>
        <Action>
          <form id="addMemberForm"
                name="addMemberForm"
                noValidate
                onSubmit={ handleSubmit(this.handleSubmit) }
          >
            <div className={ userTheme['user-form']}>
              <div className={ classNames(userTheme.user, userTheme['user-item--form']) }>
                <div className={ userTheme['user-name--form'] }>
                  { /* <div className={ userTheme['user-spacer'] }>
                  </div> */ }
                  <Avatar>
                    <div className={ userTheme['user-initials'] }>
                      ...
                    </div>
                  </Avatar>
                  <Input
                    disabled
                    label={ formatMessage({ id: 'name-label' }) }
                    name="name"
                  />
                </div>
                <div className={ userTheme['user-username--form'] }>
                  <Input
                    disabled
                    label={ formatMessage({ id: 'username-label' }) }
                    name="username"
                  />
                </div>
                <div className={ userTheme['user-group--form'] }>
                  { /* TODO change this by a dorpdown */ }
                  <span
                    style={{ display: 'flex', flex: '1 1 auto', position: 'relative', height: '50px', justifyContent: 'left', color: '#75757F' }}>
                    admin
                  </span>
                </div>
                <div className={ userTheme['user-email--form'] }>
                  <Input
                    { ...email }
                    error={
                      email.touched && email.error ?
                      formatMessage({ id: email.error }, { fieldName: formatMessage({ id: 'email-input-label' }) }) :
                      ''
                    }
                    hint={ formatMessage({ id: 'email-hint-label' }) }
                    label={ formatMessage({ id: 'email-label' }) }
                    name="email"
                    required
                    type="email"
                  />
                </div>
              </div>
            </div>
            <div>
              { /* <Button
                label="Save"
                primary
              />
              <Button
                label="Cancel"
              /> */ }
              <Button
                accent
                disabled={ submitting }
                icon="add_circle_outline"
                label="Add members"
                onTouchTap={ handleSubmit(this.handleSubmit) }
                type="submit"
              />
            </div>
          </form>
        </Action>
        <Paragraph>
          <div className={ userClasses }>
            <div className={ userTheme['user-name'] }>
              <div className={ userTheme['user-spacer'] }>
              </div>
              <FormattedMessage id={'name-label'} />
            </div>
            <div className={ userTheme['user-username'] }>
              <FormattedMessage id={'username-label'} />
            </div>
            <div className={ userTheme['user-group'] }>
              <FormattedMessage id={'group-label'} />
            </div>
            <div className={ userTheme['user-email'] }>
              <FormattedMessage id={'email-label'} />
            </div>
          </div>
          { members && members.length &&
            members.map((userId, index) => (
              <User
                key={ index }
                userId={ userId }
              />
            ))
          }
        </Paragraph>
      </Page>
    )
  }
}

// StacksPage container
const mapStateProps = (state) => (
  {
    projectConfigId: state.projectConfig.id,
    members: state.projectConfig.users
  }
)

const MembersPageContainer = compose(
  reduxForm(
    {
      form: 'addMemberForm',
      fields: ['email'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      addUserToProjectConfig,
      getProjectConfig,
      setNavVisibility,
      updateMenuPath
    }
  ),
  injectIntl
)(MembersPage)


export default MembersPageContainer
