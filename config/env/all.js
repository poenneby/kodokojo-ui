import api from '../shared/api.endpoints'

/**
 * Set docker host
 */
let localApiHost
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
      brick: `${api.brick}`,
      event: `${api.event}`,
      projectConfig: `${api.projectConfig}`,
      project: `${api.project}`,
      user: `${api.user}`
    }
  }
}

export default all
