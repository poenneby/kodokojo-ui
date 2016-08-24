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

import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'

// TODO TU
export const updateBricks = (prevBricks, bricks) => {
  const nextBricks = cloneDeep(prevBricks)
  if (bricks.length > []) {
    bricks.forEach(brick => {
      if (brick) {
        const brickIndex = findIndex(prevBricks, { name: brick.name })
        nextBricks[brickIndex] = brick
      }
    })
  }
  return nextBricks
}

// TODO TU
export const updateMenu = (prevMenu, menu) => {
  const nextMenu = cloneDeep(prevMenu)
  const higherMenuIndex = orderBy(menu, ['index'], ['desc'])[0].index
  nextMenu.splice(higherMenuIndex, nextMenu.lenght - 1)
  menu.forEach((menuItem) => {
    nextMenu[menuItem.index] = merge(
      nextMenu[menuItem.index],
      menuItem
    )
  })
  return orderBy(nextMenu, ['index'], ['asc'])
}
