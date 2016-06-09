import merge from 'lodash/merge'

import { getToken } from './auth.service'

const ioService = {}

/**
 * Return a headers object that merge basic, auth and param header object
 *
 * @param header {object} headers to add or overwrite
 * @returns {object} headers
 */
ioService.getHeaders = (header) => {
  const token = getToken()
  return merge(
    {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    header,
    token ? { Authorization: `Basic ${token}` } : {}
  )
}

// public API
export const getHeaders = ioService.getHeaders

export default ioService
