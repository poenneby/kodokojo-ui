import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'

// TODO TU
export const updateBricks = (prevBricks, bricks) => {
  const nextBricks = cloneDeep(prevBricks)
  if (bricks.length > []) {
    bricks.forEach((brick) => {
      const brickIndex = findIndex(prevBricks, { name: brick.name })
      nextBricks[brickIndex] = brick
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
