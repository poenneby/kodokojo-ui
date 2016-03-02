import _ from 'lodash'

import api from '../shared/api.endpoints'

let localApiHost

/**
 * Set docker host
 */
if (process.env.DOCKER_HOST) {
  const dockerHost = process.env.DOCKER_HOST

  if (dockerHost.match(/unix\/\//)) {
    localApiHost = 'localhost'
  }

  if (dockerHost.match(/^tcp:\/\//)) {
    localApiHost = dockerHost.match(/^tcp:\/\/([\d|.]*):\d*/)[1]
  }
}

const all = {
  api: {
    host: `http://${localApiHost}`,
    routes: {
      initUser: `${api.user}`,
      putUser: `${api.user}/:id`
    }
  }
}

export default all