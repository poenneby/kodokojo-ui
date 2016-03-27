const validatorService = {}


validatorService._isEmpty = (value) => {
  return value === undefined || value === null || value === ''
}

validatorService._join = (rules) => {
  return (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];
}

validatorService.email = (value) => {
  if (!this._isEmpty(value) && !/^(?=[\S]{6,50}$)[A-zÀ-ÿ0-9._-]+@(?:[A-Za-z0-9-]{1,}\.){1,}[A-Za-z]{2,}$/i.test(value)) {
    return 'Invalid email address'
  }
}

validatorService.createValidator = (rules) => {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = this._join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}

// public API
export const email = validatorService.email
export const createValidator = validatorService.createValidator

export default validatorService