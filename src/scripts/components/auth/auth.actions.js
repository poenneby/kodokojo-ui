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

import {
  CAPTCHA_INIT,
  CAPTCHA_UPDATE,
  CAPTCHA_RESET
} from '../../commons/constants'

// TODO UT
export function initCaptcha() {
  return {
    type: CAPTCHA_INIT
  }
}

export function updateCaptcha(captcha) {
  return {
    type: CAPTCHA_UPDATE,
    payload: {
      captcha
    }
  }
}

export function resetCaptcha() {
  return {
    type: CAPTCHA_RESET
  }
}
