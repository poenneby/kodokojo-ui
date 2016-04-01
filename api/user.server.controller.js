import * as userRepository from './user.server.repository'

export const initUser = (request, response) => {
  userRepository
    .initUser()
    .then((data) => {
      return response.status(201).send(data)
    })
    .catch((err) =>{
      return response.status(500).send(err)
    })
}

export const postUser = (request, response) => {
  userRepository
      .postUser(request.params.id, request.body.email)
      .then((data) => {
        return response.status(201).send(data)
      })
      .catch((err) => {
        return response.status(500).send(err)
      })

}
