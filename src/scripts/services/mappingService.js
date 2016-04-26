const mappingService = {}

/**
 * Mapping for account
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
 * Mapping for user
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
 * Mapping for project config
 *
 * @param data
 * @returns {{id: (string), name: (string), owner: {user}, stacks: [array], users: [array<user>]}}
 */
mappingService.mapProjectConfig = (data) => {
  return {
    id: data.identifier,
    name: data.name,
    owner: mappingService.mapUser(data.owner),
    stacks: data.stackConfigs,
    users: data.users ? data.users.map(user => mappingService.mapUser(user)) : undefined
  }
}

// public API
export const mapAccount = mappingService.mapAccount
export const mapUser = mappingService.mapUser
export const mapProjectConfig = mappingService.mapProjectConfig

export default mappingService