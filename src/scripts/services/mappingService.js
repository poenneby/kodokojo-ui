import findIndx from 'lodash/findIndex'
import omit from 'lodash/omit'

const mappingService = {}

/**
 * mapping for account
 *
 * @param data
 * @returns {{id: (string), name: (string), userName: (string), email: (string), password: (string), sshKeyPublic: (string), sshKeyPrivate: (string)}}
 */
mappingService.mapAccount = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    userName: data.username,
    email: data.email,
    password: data.password,
    sshKeyPublic: data.sshPublicKey,
    sshKeyPrivate: data.privateKey
  }
}

/**
 * mapping for user
 *
 * @param data
 * @returns {{id: (string), name: (string), userName: (string), email: (string)}}
 */
mappingService.mapUser = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    userName: data.username,
    email: data.email
  }
}

/**
 * mapping for project config
 *
 * @param data
 * @returns {{id: (string), name: (string), owner: {user}, stacks: [array<{stack}>], users: [array<{user}>]}}
 */
mappingService.mapProjectConfig = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    owner: mappingService.mapUser(data.owner),
    stacks: mappingService.mapStacks(data.stackConfigs),
    users: data.users ? data.users.map(user => mappingService.mapUser(user)) : undefined
  }
}

/**
 * mapping for stacks
 *
 * @param data
 * @returns [array] stacks
 */
mappingService.mapStacks = (data) => {
  return data.map((stack) => {
    return {
      type: stack.type,
      name: stack.name,
      bricks: mappingService.mapBricks(stack.brickConfigs)
    }
  })
}

/**
 * mapping for bricks
 *
 * @param data
 * @returns {{brick}}
 */
mappingService.mapBricks = (data) => {
  const bricks = []
  data.map((brick) => {
    if (brick.type !== 'LOADBALANCER') {
      bricks.push({
        type: brick.type,
        name: brick.name,
        state: brick.state,
        url: brick.url
      })
    }
  })
  return bricks
}

/**
 * mapping for brick events from websocket
 * 
 * @param data
 * @returns {{entity: (string), action: (string), data: {projectConfigurationId: (string), brickType: (string), brickName: (string), brickState: (string|undefined), brickUrl: (string|undefined)}}}
 */
mappingService.mapBrickEvents = (data) => {
  return {
    entity: data.entity,
    action: data.action,
    data: {
      projectConfigurationId: data.data.projectConfiguration,
      brickType: data.data.brickType,
      brickName: data.data.brickName,
      brickState: data.data.state,
      brickUrl: data.data.url
    }
  }
}

// public API
export const mapAccount = mappingService.mapAccount
export const mapUser = mappingService.mapUser
export const mapProjectConfig = mappingService.mapProjectConfig
export const mapBrickEvents = mappingService.mapBrickEvents

export default mappingService