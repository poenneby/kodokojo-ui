/* eslint-disable react/prop-types */

import React from 'react'

// Component
import Button from '../_ui/button/Button.component'

const UserAddButton = ({
  disabled,
  label,
  onToggleForm
}) => (
  <Button
    accent
    disabled={ disabled }
    icon="add_circle_outline"
    label={ label }
    onMouseUp={ onToggleForm }
    type="button"
  />
)

UserAddButton.protoTypes = {
  disabled: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  onToggleForm: React.PropTypes.func.isRequired
}

UserAddButton.defaultProps = {
  disabled: false,
  label: ''
}

export default UserAddButton
