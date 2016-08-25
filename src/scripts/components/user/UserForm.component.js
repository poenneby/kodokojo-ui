/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

// Component
import '../../../styles/_commons.less'
import userTheme from '../user/user.scss'
import Avatar from '../_ui/avatar/Avatar.component'
import Button from '../_ui/button/Button.component'
import Input from '../_ui/input/Input.component'
import { emailValidator } from '../../services/validator.service'
import { returnErrorKey } from '../../services/error.service'
import { addUserToProjectConfig } from '../projectConfig/projectConfig.actions'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// TODO TU
// UserForm component
export class UserForm extends Component {

  static propTypes = {
    addUserToProjectConfig: PropTypes.func,
    fields: PropTypes.object.isRequired,
    formActive: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    intl: intlShape.isRequired,
    onToggleFormActive: PropTypes.func.isRequired,
    projectConfigId: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    theme: PropTypes.object,
    user: PropTypes.object
  }

  shouldComponentUpdate() {
    const { formActive } = this.props

    return formActive !== undefined
  }

  handleToggleForm = () => {
    const { onToggleFormActive } = this.props

    onToggleFormActive()
  }

  handleCancel = () => {
    const { onToggleFormActive, resetForm } = this.props

    onToggleFormActive()
    resetForm()
  }

  handleSubmit = () => {
    const { fields: { email }, addUserToProjectConfig, projectConfigId, onToggleFormActive } = this.props // eslint-disable-line no-shadow

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    }
    if (nextEmail && nextEmail.trim()) {
      return addUserToProjectConfig(projectConfigId, nextEmail.trim())
        .then(() => {
          onToggleFormActive()
          return Promise.resolve()
        })
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
    const { fields: { email }, handleSubmit, submitting, formActive } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <div>
      { !formActive &&
        <Button
          accent
          disabled={ submitting }
          icon="add_circle_outline"
          label={ formatMessage({ id: 'add-member-label' }) }
          onMouseUp={ this.handleToggleForm }
          type="button"
        />
      }
      { formActive &&
        <form id="addMemberForm"
              name="addMemberForm"
              noValidate
              onSubmit={ handleSubmit(this.handleSubmit) }
        >
          <div className={ userTheme['user-form']}>
            <div className={ classNames(userTheme.user, userTheme['user-item--form']) }>
              <div className={ userTheme['user-name--form'] }>
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
                { /* TODO change this by a dropdown */ }
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
          <div style={{ textAlign: 'right' }}>
            <Button
              disabled={ submitting }
              label={ formatMessage({ id: 'cancel-label' })}
              onMouseUp={ this.handleCancel }
            />
            <Button
              disabled={ submitting }
              label={ formatMessage({ id: 'save-label' })}
              onMouseUp={ handleSubmit(this.handleSubmit) }
              primary
              type="submit"
            />
          </div>
        </form>
      }
      </div>
    )
  }
}

// UserForm container
const mapStateProps = (state, ownProps) => (
  {
    projectConfigId: state.projectConfig.id
  }
)

const UserFormContainer = compose(
  reduxForm(
    {
      form: 'addMemberForm',
      fields: ['email'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      addUserToProjectConfig
    }
  ),
  injectIntl
)(UserForm)


export default UserFormContainer
