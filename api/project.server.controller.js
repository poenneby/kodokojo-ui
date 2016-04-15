import * as projectRepository from './project.server.repository'

export const postProjectConfig = (request, response) => {
  projectRepository
    .postProjectConfig(request.headers, request.body.name, request.body.ownerIdentifier, request.body.userIdentifiers)
    .then(data => {
      return response.status(201).send(data)
    })
    .catch((err, resp) => {
      return response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err)
    })
}