import React from 'react'
import { themr } from 'react-css-themr'

// UI library component
import { Overlay as ToolboxOverlay } from 'react-toolbox/lib/overlay'
import { dialogFactory as toolboxDialogFactory } from 'react-toolbox/lib/dialog/Dialog'

// component
import { DIALOG } from '../../../commons/identifiers'
import '../../../../styles/_commons.less'
import dialogTheme from './dialog.scss'
import Button from '../button/Button.component'

/**
 * UI: Dialog component
 *
 */
const Dialog = toolboxDialogFactory(ToolboxOverlay, Button)
export default themr(DIALOG, dialogTheme)(Dialog)

