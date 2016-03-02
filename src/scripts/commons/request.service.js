import requestPromise from 'request-promise'

const requestService = {}

requestService.request = () => {
  return requestPromise(options)
      .then((res) => {
        return res
      }).catch((error, response, body) => {
        return error
      })
}

export const request = requestService.request

export default requestService
