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

// UI library component
import { Overlay as ToolboxOverlay } from 'react-toolbox/lib/overlay'
import { snackbarFactory as toolboxSnackbarFactory } from 'react-toolbox/lib/snackbar/Snackbar'

// component
import '../../../../styles/_commons.less'
import toasterAcceptTheme from './toasterAccept.scss'
import toasterCancelTheme from './toasterCancel.scss'
import toasterWarningTheme from './toasterWarning.scss'
import Button from '../button/Button.component'

/**
 * UI: Toaster component
 *
 */
const ToolboxSnackbar = toolboxSnackbarFactory(ToolboxOverlay, Button)
export class Toaster extends React.Component {
  static propTypes = {
    toasterVariant: React.PropTypes.oneOf(['warning', 'action'])
  }
  
  render() {
    const { toasterVariant } = this.props
    const rest = { ...this.props }
    delete rest.toasterVariant

    let theme
    switch (toasterVariant) {
      case 'accept':
        theme = toasterAcceptTheme
        break
      case 'cancel':
        theme = toasterCancelTheme
        break
      case 'warning':
        theme = toasterWarningTheme
        break
    }

    return (
      <ToolboxSnackbar
        {...rest}
        theme={ theme }
      />
    )
  }
}

export default Toaster
