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

import { getStatusByState, getStatusByOrder } from './param.service'

// TODO TU
/**
 * Update bricks, merge previous state with partial state
 *
 * @param prevBricks
 * @param bricks
 * @returns {Array} bricks updated
 */
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
/**
 * Aggregate brick state for a given stack
 *
 * @param bricks
 * @returns {Object} status
 */
export const updateAggregatedStackStatus = (bricks) => {
  if (bricks.length) {
    const stateOrder = bricks.reduce((previous, brick) => {
      const previousStateOrder = previous.state ? getStatusByState(previous.state).order : previous
      const currentStateOrder = getStatusByState(brick.state).order
      const minStateOrder = Math.min(previousStateOrder, currentStateOrder)
      return minStateOrder
    })
    return getStatusByOrder(stateOrder)
  }
  return getStatusByState('DEFAULT')
}
