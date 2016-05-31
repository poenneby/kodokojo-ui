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
  console.log('youhou', path)
  return dispatch => {
    console.log('coucou')
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
