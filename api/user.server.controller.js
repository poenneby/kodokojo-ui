import * as userRepository from './user.server.repository'

export const initUser = (request, response) => {
  userRepository
    .initUser()
    .then(data => response.status(201).send(data))
    .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const postUser = (request, response) => {
  userRepository
      .postUser(request.params.id, request.body.email)
      .then(data => response.status(201).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const getUserAccount = (request, response) => {
  userRepository
      .getUserAccount(request.headers.authorization)
      .then(data => response.status(200).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}

export const getUser = (request, response) => {
  userRepository
      .getUser(request.headers.authorization, request.params.userId)
      .then(data => response.status(200).send(data))
      .catch((err, resp) => response.status(err.response && err.response.statusCode ? err.response.statusCode : 500).send(err))
}
