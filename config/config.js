import _ from 'lodash'

/**
 * Load app configurations
 */
export default _.merge(
    require('./env/all').default,
    require(`./env/${process.env.NODE_ENV}`).default || {}
)
