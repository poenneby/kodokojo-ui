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

// TODO set protocol into parameter to serve https or http or ws
const all = {
  api: {
    host: localApiHost ? `http://${localApiHost}` : undefined,
    routes: {
      user: `${api.user}`,
      projectConfig: `${api.projectConfig}`,
      project: `${api.project}`,
      event: `${api.event}`
    }
  }
}

export default all