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

export const getProjectConfig = (request, response) => {
  projectRepository
    .getProjectConfig(request.headers, request.params.projectConfigId)
    .then(data => {
      return response.status(201).send(data)
    })
    .catch((err, resp) => {
      return response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err)
    })
}

export const putUserToProjectConfig = (request, response) => {
  projectRepository
    .putUserToProjectConfig(request.headers, request.params.projectConfigId, request.body)
    .then(data => {
      return response.status(200).send(data)
    })
    .catch((err, resp) => {
      return response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err)
    })
}

export const postProject = (request, response) => {
  projectRepository
    .postProject(request.headers, request.params.projectConfigId)
    .then(data => {
      return response.status(201).send(data)
    })
    .catch((err, resp) => {
      return response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err)
    })
}


export const getProject = (request, response) => {
  projectRepository
    .getProject(request.headers, request.params.projectId)
      .then(data => {
        return response.status(200).send(data)
      })
      .catch((err, resp) => {
        return response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err)
      })
}

