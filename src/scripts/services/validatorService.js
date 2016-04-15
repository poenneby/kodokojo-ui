import { createValidator } from 'revalidate'

const validatorService = {}

validatorService._isEmpty = (value) => {
  return value === undefined || value === null || value === ''
}

/**
 * Return email pattern matching
 *
 * @param value
 * @returns {boolean}
 */
validatorService.email = (value) => {
  return !validatorService._isEmpty(value) && !/^(?=[\S]{6,50}$)[A-zÀ-ÿ0-9._-]+@(?:[A-Za-z0-9-]{1,}\.){1,}[A-Za-z]{2,}$/i.test(value)
}

/**
 * Revalidate validator for Email pattern
 */
validatorService.emailValidator = createValidator(
  message => value => {
    if (validatorService.email(value)) {
      return message
    }
  },
  'email-validation-pattern-error'
)

/**
 * Standard delay for async validation
 *
 * @type {number}
 */
validatorService.delayStandard = 800

// public API
export const email = validatorService.email
export const emailValidator = validatorService.emailValidator
export const delayStandard = validatorService.delayStandard

export default validatorService