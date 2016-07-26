import api from '../shared/api.endpoints'

/**
 * Set docker host
 */
let localApiHost
if (process.env.DOCKER_HOST) {
  const dockerHost = process.env.DOCKER_HOST

  if (dockerHost.match(/unix\/\//)) {
    localApiHost = 'http://localhost'
  }

  if (dockerHost.match(/^tcp:\/\//)) {
    localApiHost = `http://${dockerHost.match(/^tcp:\/\/([\d|.]*):\d*/)[1]}`
  }
}

if (process.env.API_ENV) {
  localApiHost = `https://${process.env.API_ENV}`
}

// TODO set protocol into parameter to serve https or http or ws
const all = {
  api: {
    host: localApiHost,
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
