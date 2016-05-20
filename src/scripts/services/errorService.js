const errorService = {}

/**
 * Return error key to be parsed with react-intl
 *
 * @param component
 * @param action
 * @param code
 * @returns {string}
 */
errorService.returnErrorKey = (component, action, code) => `${component}-${action}-${code}`

// public API
export const returnErrorKey = errorService.returnErrorKey

export default errorService
