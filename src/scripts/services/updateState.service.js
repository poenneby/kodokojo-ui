import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

export const updateBricks = (prevBricks, bricks) => {
  const nextBricks = cloneDeep(prevBricks)
  bricks.forEach((brick) => {
    const brickIndex = findIndex(prevBricks, { name: brick.name })
    nextBricks[brickIndex] = brick
  })
  return nextBricks
}
