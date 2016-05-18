const mappingService = {}

// TODO TI

/**
 * mapping for account
 *
 * @param data
 * @returns {{id: string, name: string, userName: string, email: string, password: string, sshKeyPublic: string, sshKeyPrivate: string}}
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
    entityId: data.entityIdentifier,
    projectConfigIds: data.projectConfigurationIds ? data.projectConfigurationIds.map(projectConfigId => mappingService.mapProjectConfigId(projectConfigId)) : undefined
  }
}

/**
 * mapping for "project config id"
 * @param data
 * @returns {{projectConfigurationId: string, projectId: string}}
 */
mappingService.mapProjectConfigId = (data) => {
  return {
    projectConfigId: data.projectConfigurationId,
    projectId: data.projectId
  }
}

/**
 * mapping for user
 *
 * @param data
 * @returns {{id: string, name: string, userName: string, email: string}}
 */
mappingService.mapUser = (data) => {
  return {
    id: data.identifier,
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.name,
    userName: data.username,
    email: data.email
  }
}

/**
 * mapping for stack
 *
 * @returns {{type: string, name: string, bricks: array<brick>}}
 * @private
 */
mappingService._mapStack = (data) => {
  const bricks = data.brickConfigs || data.brickStates || undefined
  return {
    type: data.type,
    name: data.name,
    bricks: bricks ? bricks.map(brick => mappingService._mapBrick(brick)).filter(brick => brick !== undefined) : undefined
  }
}

/**
 * mapping for brick
 *
 * @returns {{type: string, name: string, state: string, url: string}}
 * @private
 */
mappingService._mapBrick = (data) => {
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
 * mapping for project config
 *
 * @param data
 * @returns {{id: string, name: string, admins: {user}, stacks: array<stack>, users: array<user>}}
 */
mappingService.mapProjectConfig = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    // admins: data.admins ? data.admins.map(admin => mappingService.mapUser(admin)) : undefined,
    admins: data.admins ? data.admins.map(admin => admin.identifier) : undefined,
    stacks: data.stackConfigs ? data.stackConfigs.map(stack => mappingService._mapStack(stack)) : undefined,
    // users: data.users ? data.users.map(user => mappingService.mapUser(user)) : undefined
    users: data.users ? data.users.map(user => user.identifier) : undefined
  }
}

/**
 * mapping for project
 *
 * @param data
 * @returns {{id: string, projectConfigId: string, name: string, updateDate: string, stacks: array<stack>}}
 */
mappingService.mapProject = (data) => {
  return {
    id: data.identifier,
    projectConfigId: data.projectConfigurationIdentifier,
    name: data.name,
    updateDate: data.snapshotDate, // TODO convert string to date?
    stacks: data.stacks ? data.stacks.map(stack => mappingService._mapStack(stack)) : undefined
  }
}

/**
 * mapping for brick event from websocket
 * 
 * @param data
 * @returns {{entity: string, action: string, data: {projectConfigurationId: string, brickType: string, brickName: string, brickState: (string|undefined), brickUrl: (string|undefined)}}}
 */
mappingService.mapBrickEvent = (data) => {
  return {
    entity: data.entity,
    action: data.action,
    data: {
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
export const mapProject = mappingService.mapProject
export const mapProjectConfig = mappingService.mapProjectConfig
export const mapProjectConfigId = mappingService.mapProjectConfigId
export const mapBrickEvent = mappingService.mapBrickEvent

export default mappingService