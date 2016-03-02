import requestPromise from 'request-promise'
import logger from '../config/logger'

export const requestWithLog = (options) => {
  let startMessage = `${options.method} request on uri ${options.uri}`
  if (options.body) {
    startMessage += `\n Body : ${JSON.stringify(options.body, null, 2)}`
  }

  return requestPromise(options).then((res) => {
    logger.debug(startMessage)
    logger.debug(JSON.stringify(res, null, 2))
    return res
  }).catch((error, response, body) => {
    logger.error(startMessage)
    logger.error(JSON.stringify(error, null, 2))
    throw error
  });

};
