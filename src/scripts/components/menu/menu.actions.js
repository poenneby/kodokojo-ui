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

import Promise from 'bluebird'
import {
  MENU_UPDATE,
  MENU_SET
} from '../../commons/constants'
import concat from 'lodash/concat'
import flattenDeep from 'lodash/flattenDeep'
import findIndex from 'lodash/findIndex'
import isInteger from 'lodash/isInteger'

export function setMenu(menu) {
  return {
    type: MENU_SET,
    menu
  }
}

export function initMenu(projectName) {
  return dispatch => {
    const menuRoot = [{
      disabled: true,
      index: 0,
      labelKey: 'projects-label',
      level: 0,
      // TODO change to real route when page is done
      route: '#projects',
      titleText: 'disabled because projects page does not exist'
    }]

    const menuProject = [{
      index: 1,
      disabled: true,
      labelText: projectName || '',
      titleText: projectName || ''
    }]


    let menu
    if (projectName) {
      menu = flattenDeep(concat(menuRoot, menuProject))
    } else {
      menu = menuRoot
    }

    return dispatch(setMenu(menu))
  }
}

export function updateMenu(menu) {
  return {
    type: MENU_UPDATE,
    menu
  }
}

export function updateMenuPath(path) {
  return dispatch => {
    let nextMenu
    const rootMenu = [{
      disabled: true,
      index: 0
    }]

    const subMenu = [
      {
        active: false,
        index: 2,
        labelKey: 'stacks-label',
        level: 1,
        route: '/stacks',
        titleKey: 'stacks-label'
      },
      {
        active: false,
        index: 3,
        labelKey: 'members-label',
        level: 2,
        route: '/members',
        titleKey: 'members-label'
      }
    ]

    const selectedSubMenuIndex = findIndex(subMenu, { route: path })

    if (isInteger(selectedSubMenuIndex)) {
      subMenu[selectedSubMenuIndex].active = true
      nextMenu = subMenu
    } else {
      const selectedMenuIndex = findIndex(rootMenu, { route: path })

      if (isInteger(selectedMenuIndex)) {
        rootMenu.active = true
        nextMenu = rootMenu
      } else {
        // TODO error
      }
    }

    return dispatch(updateMenu(nextMenu))
  }
}
