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
    sshKeyPrivate: data.privateKey,
    entityId: data.entityIdentifier
  }
}

/**
 * mapping for project config
 *
 * @param data
 * @returns {{id: (string), name: (string), admins: {user}, stacks: [array<{stack}>], users: [array<{user}>]}}
 */
mappingService.mapProjectConfig = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    admins: data.admins ? data.admins.map(admin => mappingService.mapUser(admin)) : undefined,
    stacks: data.stackConfigs ? data.stackConfigs.map(stack => mappingService.mapStack(stack)) : undefined,
    users: data.users ? data.users.map(user => mappingService.mapUser(user)) : undefined
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
 * mapping for stack
 *
 * @returns {{type: (string), name: (string), bricks: [array<{brick}]}}
 */
mappingService.mapStack = (data) => {
  return {
    type: data.type,
    name: data.name,
    bricks: data.brickConfigs ? data.brickConfigs.map(brick => mappingService.mapBrick(brick)) : undefined
  }
}

/**
 * mapping for brick
 *
 * @returns {{type: (string), name: (string), state: (string), url: (string)}}
 */
mappingService.mapBrick = (data) => {
  if (data.type !== 'LOADBALANCER') {
    return {
      type: data.type,
      name: data.name,
      state: data.state,
      url: data.url
    }
  }
}

/**
 * mapping for brick events from websocket
 * 
 * @param data
 * @returns {{entity: (string), action: (string), data: {projectConfigurationId: (string), brickType: (string), brickName: (string), brickState: (string|undefined), brickUrl: (string|undefined)}}}
 */
mappingService.mapBrickEvent = (data) => {
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
export const mapBrickEvent = mappingService.mapBrickEvent

export default mappingService