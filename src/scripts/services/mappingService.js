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
    entityId: data.entityIdentifier,
    projectConfigIds: data.projectConfigurationIds ? data.projectConfigurationIds.map(projectConfigId => mappingService.mapProjectConfigId(projectConfigId)) : undefined
  }
}

/**
 * mapping for "project config id"
 * @param data
 * @returns {{projectConfigurationId: (string|*), projectId: *}}
 */
mappingService.mapProjectConfigId = (data) => {
  return {
    projectConfigId: data.projectConfigurationId,
    projectId: data.projectId
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
    bricks: data.brickConfigs ? data.brickConfigs.map(brick => mappingService.mapBrick(brick)).filter(brick => brick !== undefined) : undefined
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
      brickType: data.data.brickType,
      brickName: data.data.brickName,
      brickState: data.data.state,
      brickUrl: data.data.url
    }
  }
}


const project = `{
  "identifier": "27fa9603fafe9667861844e804a7772d8441b8c5",
  "projectConfigurationIdentifier": "5046c08bfa80f7db73c643a981bf0779f4a2930f",
  "name": "toto",
  "snapshotDate": "May 16, 2016 2:11:47 PM",
  "stacks": [
    {
      "name": "build-A",
      "stackType": "BUILD",
      "brickStates": [
        {
          "projectConfigurationIdentifier": "5046c08bfa80f7db73c643a981bf0779f4a2930f",
          "brickType": "REPOSITORY",
          "stackName": "build-A",
          "brickName": "nexus",
          "state": "STARTING",
          "url": "https://repository-toto.kodokojo.dev"
        },
        {
          "projectConfigurationIdentifier": "5046c08bfa80f7db73c643a981bf0779f4a2930f",
          "brickType": "CI",
          "stackName": "build-A",
          "brickName": "jenkins",
          "state": "STARTING",
          "url": "https://ci-toto.kodokojo.dev"
        },
        {
          "projectConfigurationIdentifier": "5046c08bfa80f7db73c643a981bf0779f4a2930f",
          "brickType": "SCM",
          "stackName": "build-A",
          "brickName": "gitlab",
          "state": "STARTING",
          "url": "https://scm-toto.kodokojo.dev"
        },
        {
          "projectConfigurationIdentifier": "5046c08bfa80f7db73c643a981bf0779f4a2930f",
          "brickType": "LOADBALANCER",
          "stackName": "build-A",
          "brickName": "haproxy",
          "state": "RUNNING",
          "url": "https://loadbalancer-toto.kodokojo.dev"
        }
      ]
    }
  ]
}`

// public API
export const mapAccount = mappingService.mapAccount
export const mapUser = mappingService.mapUser
export const mapProjectConfig = mappingService.mapProjectConfig
export const mapProjectConfigId = mappingService.mapProjectConfigId
export const mapBrickEvent = mappingService.mapBrickEvent

export default mappingService