import config from '../config/config'
import logger from '../config/logger'

import { requestWithLog } from './utils.server.service'

const brickRepository = {}

brickRepository.getBricks = (headers) => {
  logger.debug('getBricks', config.api.routes.brick)
  return requestWithLog({
    method: 'GET',
    uri: `${config.api.host}${config.api.routes.brick}`,
    json: true,
    headers
  })
}

// Public API
export const getBricks = brickRepository.getBricks

// Service instance
export default brickRepository
