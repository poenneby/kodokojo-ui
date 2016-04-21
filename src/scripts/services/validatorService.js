import { createValidator, composeValidators, isRequired, hasLengthBetween } from 'revalidate'

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
 * Revalidate email pattern validator
 */
validatorService._emailCustomValidator = createValidator(
  message => value => {
    if (validatorService.email(value)) {
      return message
    }
  },
  'email-pattern-error'
)
validatorService.emailValidator = composeValidators(
  isRequired({ message: 'general-input-required-error' }),
  validatorService._emailCustomValidator
)

/**
 * Revalidate project name validator
 */
validatorService.projectNameValidator = composeValidators(
  isRequired({message: 'general-input-required-error'}),
  hasLengthBetween(1, 10)({ message: 'project-name-pattern-error' })
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
export const projectNameValidator = validatorService.projectNameValidator
export const delayStandard = validatorService.delayStandard

export default validatorService