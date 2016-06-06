import React, { Component, PropTypes } from 'react'

// UI library component
import { Input as ToolboxInput } from 'react-toolbox'

// component
import inputStyle from './input.scss'

/**
 * UI: Input component
 *
 */
export class Input extends Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floating: PropTypes.bool,
    hint: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    label: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any
  }

  render() {
    const { className, disabled, error, floating, hint,
      icon, label, maxLength, multiline, onBlur, onChange,
      onFocus, required, type, value } = this.props // eslint-disable-line no-shadow
    const inputClass = inputStyle.input

    return (
      <ToolboxInput
        className={ className ? `${inputClass} ${className}` : `${inputClass}` }
        disabled={ disabled }
        error={ error }
        floating={ floating }
        hint={ hint }
        icon={ icon }
        label={ label }
        maxLength={ maxLength }
        multiline={ multiline }
        onBlur={ onBlur }
        onChange={ onChange }
        onFocus={ onFocus }
        required={ required }
        type={ type }
        value={ value }
      />
    )
  }
}

export default Input
