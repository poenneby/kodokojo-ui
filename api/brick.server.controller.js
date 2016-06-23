import * as brickRepository from './brick.server.repository'

export const getBricks = (request, response) => {
  brickRepository
    .getBricks(request.headers)
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}
