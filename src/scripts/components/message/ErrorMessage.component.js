import React from 'react'
import { intlShape, injectIntl } from 'react-intl'

// we don't validate propTypes for redux-form because we will have to filter all none used in toolbox component
// see https://github.com/Hacker0x01/react-datepicker/issues/517#issuecomment-230119718
/* eslint-disable react/prop-types */

// component
import '../../../styles/_commons.less'
import errorTheme from './message.scss'

/**
 * UI: Input component
 *
 */
class ErrorMessage extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    intl: intlShape.isRequired
  }

  render() {
    const { formatMessage } = this.props.intl
    const { input, meta, errorKey } = this.props

    return (
      <div
        className={ errorTheme['message--error'] }
      >
        { meta && meta.touched && meta.error &&
          formatMessage({ id: meta.error }, { fieldName: errorKey ? formatMessage({ id: errorKey }) : '' })
        }
      </div>
    )
  }
}

export default injectIntl(ErrorMessage)
