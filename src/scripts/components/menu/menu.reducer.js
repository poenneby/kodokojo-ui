import {
  MENU_SET,
  MENU_UPDATE
} from '../../commons/constants'
import { updateMenu } from '../../services/stateUpdate.service'

const stateDefault = []

export default function menu(state = stateDefault, action) {
  if (action.type === MENU_SET) {
    return action.menu
  }
  if (action.type === MENU_UPDATE) {
    return updateMenu(state, action.menu)
  }
  return state
}
