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
validatorService.isEmailValid = (value) => {
  return !validatorService._isEmpty(value) && /^(?=[\S]{6,50}$)[A-Za-z0-9._-]+@(?:[A-Za-z0-9-]{1,}\.){1,}[A-Za-z]{2,}$/.test(value)
}

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
    },
    'email-pattern-error'
  )
)

validatorService.isProjectNameValid = (value) => {
  return !validatorService._isEmpty(value) && /([a-zA-Z0-9\-_]){4,20}/.test(value)
}

/**
 * Revalidate projectConfig name validator
 */
validatorService.projectNameValidator = composeValidators(
  isRequired({message: 'general-input-required-error'}),
  createValidator(
    message => value => {
      if (!validatorService.isProjectNameValid(value)) {
        return message
      }
    },
    'project-name-pattern-error'
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
export const projectNameValidator = validatorService.projectNameValidator
export const delayStandard = validatorService.delayStandard

export default validatorService