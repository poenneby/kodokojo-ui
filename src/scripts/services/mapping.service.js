const mappingService = {}

// TODO TI

/**
 * mapping for account
 *
 * @param data
 * @returns {{id: string, name: string, userName: string, email: string, password: string, sshKeyPublic: string, sshKeyPrivate: string}}
 */
mappingService.mapAccount = (data) => (
  {
    id: data.identifier,
    name: data.name,
    userName: data.username,
    email: data.email,
    password: data.password,
    sshKeyPublic: data.sshPublicKey,
    sshKeyPrivate: data.privateKey,
    entityId: data.entityIdentifier,
    projectConfigIds: data.projectConfigurationIds ?
      data.projectConfigurationIds.map(projectConfigId => mappingService.mapProjectConfigId(projectConfigId)) :
      undefined
  }
)

/**
 * mapping for "project config id"
 * @param data
 * @returns {{projectConfigurationId: string, projectId: string}}
 */
mappingService.mapProjectConfigId = (data) => (
  {
    projectConfigId: data.projectConfigurationId,
    projectId: data.projectId
  }
)

/**
 * mapping for user
 *
 * @param data
 * @returns {{id: string, name: string, userName: string, email: string}}
 */
mappingService.mapUser = (data) => (
  {
    id: data.identifier,
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.name,
    userName: data.username,
    email: data.email
  }
)

/**
 * mapping for stack
 *
 * @returns {{type: string, name: string, bricks: array<brick>}}
 */
mappingService.mapStack = (data) => {
  const bricks = data.brickConfigs || data.brickStates || undefined
  return {
    type: data.type,
    name: data.name,
    bricks: bricks ?
      bricks.map(brick => mappingService.mapBrick(brick)).filter(brick => brick !== undefined) :
      undefined
  }
}

/**
 * mapping for brick
 *
 * @returns {{type: string, name: string, state: string, url: string}}
 */
mappingService.mapBrick = (data) => {
  if (data.type !== 'LOADBALANCER') {
    return {
      type: data.type || data.brickType,
      name: data.name || data.brickName,
      state: data.state,
      version: data.version,
      url: data.url
    }
  }
  return undefined
}

/**
 * mapping for project config
 *
 * @param data
 * @returns {{id: string, name: string, admins: {user}, stacks: array<stack>, users: array<user>}}
 */
mappingService.mapProjectConfig = (data) => (
  {
    id: data.identifier,
    name: data.name,
    admins: data.admins ?
      data.admins.map(admin => admin.identifier) :
      undefined,
    stacks: data.stackConfigs ?
      data.stackConfigs.map(stack => mappingService.mapStack(stack)) :
      undefined,
    users: data.users ?
      data.users.map(user => user.identifier) :
      undefined
  }
)

/**
 * mapping for project
 *
 * @param data
 * @returns {{id: string, projectConfigId: string, name: string, updateDate: string, stacks: array<stack>}}
 */
mappingService.mapProject = (data) => (
  {
    id: data.identifier,
    projectConfigId: data.projectConfigurationIdentifier,
    name: data.name,
    updateDate: data.snapshotDate, // TODO convert string to date?
    stacks: data.stacks ? data.stacks.map(stack => mappingService.mapStack(stack)) : undefined
  }
)

/**
 * mapping for brick event from websocket
 *
 * @param data
 * @returns {{entity: string, action: string, data: {projectConfigurationId: string, brickType: string, brickName: string, brickState: (string|undefined), brickUrl: (string|undefined)}}}
 */
mappingService.mapBrickEvent = (data) => (
  {
    entity: data.entity, // type event
    action: data.action,
    brick: mappingService.mapBrick(data.data)
  }
)


// public API
export const mapAccount = mappingService.mapAccount
export const mapUser = mappingService.mapUser
export const mapProject = mappingService.mapProject
export const mapProjectConfig = mappingService.mapProjectConfig
export const mapProjectConfigId = mappingService.mapProjectConfigId
export const mapBrickEvent = mappingService.mapBrickEvent

export default mappingService
