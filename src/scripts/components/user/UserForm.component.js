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

import React from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'

// Component
import '../../../styles/_commons.less'
import userTheme from '../user/user.scss'
import Avatar from '../_ui/avatar/Avatar.component'
import Button from '../_ui/button/Button.component'
import Input from '../_ui/input/Input.component'
import Checkbox from '../_ui/checkbox/Checkbox.component'
import IconButton from '../_ui/button/IconButton.component'
import CloseIcon from '../_ui/icons/CloseIcon.component'
import { emailValidator } from '../../services/validator.service'
import { returnErrorKey } from '../../services/error.service'
import { getUser } from '../../commons/reducers'


// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// TODO UT
// UserForm component
export class UserForm extends React.Component {

  static propTypes = {
    addUserToProjectConfig: React.PropTypes.func,
    aggregatedStackStatus: React.PropTypes.object,
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func,
    intl: intlShape.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onSubmitFailure: React.PropTypes.func.isRequired,
    onSubmitSuccess: React.PropTypes.func.isRequired,
    onUserEditCancel: React.PropTypes.func.isRequired,
    onUserSelect: React.PropTypes.func.isRequired,
    projectConfigId: React.PropTypes.string,
    resetForm: React.PropTypes.func.isRequired,
    selectable: React.PropTypes.bool,
    submitting: React.PropTypes.bool.isRequired,
    theme: React.PropTypes.object,
    userId: React.PropTypes.string
  }

  static defaultProps = {
    selectable: false
  }

  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked || false,
      edited: true
    }
  }

  handleUserSelect = () => {
    const { userId, onUserSelect } = this.props // eslint-disable-line no-shadow
    this.setState({
      ...this.state,
      checked: !this.state.checked
    })
    onUserSelect({
      [userId]: {
        checked: !this.state.checked,
        edited: true
      }
    })
  }

  handleUserEditCancel = () => {
    const { userId, onCancel, onUserEditCancel, resetForm } = this.props
    this.setState({
      ...this.state,
      edited: false
    })
    onUserEditCancel({
      [userId]: {
        checked: this.state.checked,
        edited: false
      }
    })

    onCancel(userId)
    resetForm()
  }

  handleUserEditSubmit = () => {
    const {
      fields: { email, firstName, lasteName, password, sshKeyPublic, sshKeyPrivate },
      userId, onSubmit, onSubmitSuccess, onSubmitFailure
    } = this.props // eslint-disable-line no-shadow

    const nextEmail = email.value ? email.value.trim() : ''
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    }
    if (nextEmail && nextEmail) {
      return onSubmit(nextEmail)
        .then(() => {
          onSubmitSuccess(userId)
          return Promise.resolve()
        })
        .catch(err => {
          onSubmitFailure(userId)
          return Promise.reject({ email: returnErrorKey(
            {
              component: 'email',
              code: err.message
            })
          })
        })
    }
    // TODO add default error message
    return Promise.reject()
  }

  render() {
    const { fields: { email }, disabled, handleSubmit, selectable, submitting } = this.props // eslint-disable-line no-shadow
    const { formatMessage } = this.props.intl

    return (
      <form
        className={ userTheme['user-container--form'] }
        id="userForm"
        name="userForm"
        noValidate
        onSubmit={ handleSubmit(this.handleUserEditSubmit) }
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
            <div className={ userTheme['user-select--form']}>
              { selectable &&
                <Checkbox
                  checked={ this.props.checked }
                  disabled={ disabled }
                  onChange={ this.handleUserSelect }
                />
              }
            </div>
            <div className={ userTheme['user-edit--form']}>
              <IconButton
                className="iconButton"
                disabled={ disabled }
                icon={ <CloseIcon/> }
                onMouseUp={ this.handleUserEditCancel }
              />
            </div>
          </div>
        </div>
        <div className={ userTheme['user-actions'] }>
          <Button
            disabled={ submitting || disabled }
            label={ formatMessage({ id: 'cancel-label' })}
            onMouseUp={ this.handleUserEditCancel }
          />
          <Button
            disabled={ submitting || disabled }
            label={ formatMessage({ id: 'save-label' })}
            onMouseUp={ handleSubmit(this.handleUserEditSubmit) }
            primary
            type="submit"
          />
        </div>
      </form>
    )
  }
}

// UserForm container
const mapStateProps = (state, ownProps) => (
  {
    user: getUser(ownProps.userId, state)
  }
)

const UserFormContainer = compose(
  reduxForm(
    {
      form: 'userForm',
      fields: [
        'email',
        'firstName',
        'lastName',
        'password',
        'sshKeyPublic',
        'sshKeyPrivate'
      ],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {}
  ),
  injectIntl
)(UserForm)


export default UserFormContainer
