import * as userRepository from './user.server.repository'
import logger from '../config/logger'

export const initUser = (request, response) => {
  userRepository
    .initUser()
    .then((res) => {
      return response.status(201).send(res)
    })
    .catch((err) =>{
      return res.status(500).send(err)
    })
}

