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

import { createValidator, composeValidators, isRequired, hasLengthBetween } from 'revalidate'

const validatorService = {}

validatorService.isEmpty = (value) => value === undefined || value === null || value === ''

/**
 * Return email pattern matching
 *
 * @param value
 * @returns {boolean}
 */
validatorService.isEmailValid = (value) => !validatorService.isEmpty(value) &&
  /^(?=[\S]{6,50}$)[A-Za-z0-9._-]+@(?:[A-Za-z0-9-]{1,}\.){1,}[A-Za-z]{2,}$/.test(value)

/**
 * Revalidate email pattern validator
 */
validatorService.emailValidator = composeValidators(
  isRequired({ message: 'general-input-required-error' }),
  createValidator(
    message => value => {
      if (!validatorService.isEmailValid(value)) {
        return message
      }
      return null
    },
    'email-error-pattern'
  )
)

/**
 * Revalidate captcha validator
 */
validatorService.captchaValidator = composeValidators(
  isRequired({ message: 'captcha-error-empty' })
)

/**
 * Return project name pattern matching
 *
 * @param value
 * @returns {boolean}
 */
validatorService.isProjectNameValid = (value) => !validatorService.isEmpty(value) &&
  /^[^\s]([a-zA-Z0-9\-_]{4,20})$/.test(value)

/**
 * Revalidate projectConfig name validator
 */
validatorService.projectNameValidator = composeValidators(
  isRequired({ message: 'general-input-required-error' }),
  createValidator(
    message => value => {
      if (!validatorService.isProjectNameValid(value)) {
        return message
      }
      return null
    },
    'project-name-error-pattern'
  )
)

/**
 * Standard delay for debounce validation
 *
 * @type {number}
 */
validatorService.delayStandard = 800

// public API
export const email = validatorService.email
export const emailValidator = validatorService.emailValidator
export const captchaValidator = validatorService.captchaValidator
export const projectNameValidator = validatorService.projectNameValidator
export const delayStandard = validatorService.delayStandard

export default validatorService
