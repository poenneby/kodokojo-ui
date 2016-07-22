const errorService = {}

/**
 * Return error key to be parsed with react-intl
 *
 * @param {object} param
 * @param {string} param.component
 * @param {string} param.action
 * @param {string} param.code
 * @returns {string} error i18n string
 */
errorService.returnErrorKey = ({ component, action, code }) => `${component ? `${component}-` : ''}` +
    `${action ? `${action}-` : ''}error` +
    `${code ? `-${code}` : ''}`

// public API
export const returnErrorKey = errorService.returnErrorKey

export default errorService
