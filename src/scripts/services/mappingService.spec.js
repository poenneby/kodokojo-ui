import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import mappingService from './mappingService'

describe('mapping service', () => {

  describe('map account', () => {
    afterEach(() => {
      mappingService.mapProjectConfigId.restore()
    })

    it('should map account', () => {
      // Given
      const accountFromApi = {
        identifier: 'identifier',
        name: 'name',
        username: 'username',
        email: 'email',
        password: 'password',
        sshPublicKey: 'sshPublicKey',
        privateKey: 'privateKey',
        entityIdentifier: 'entityIdentifier',
        projectConfigurationIds: [
          'projectConfig1',
          'projectConfig2'
        ]
      }
      const mapProjectConfigIdSpy = sinon.stub(mappingService, 'mapProjectConfigId', data => data)

      // When
      const returns = mappingService.mapAccount(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'identifier',
        name: 'name',
        userName: 'username',
        email: 'email',
        password: 'password',
        sshKeyPublic: 'sshPublicKey',
        sshKeyPrivate: 'privateKey',
        entityId: 'entityIdentifier',
        projectConfigIds: [
          'projectConfig1',
          'projectConfig2'
        ]
      })
      expect(mapProjectConfigIdSpy).to.have.callCount(2)
      expect(mapProjectConfigIdSpy).to.have.been.calledWith('projectConfig1')
      expect(mapProjectConfigIdSpy).to.have.been.calledWith('projectConfig2')
    })
  })

  describe('map project config id', () => {
    it('should map project config id', () => {
      // Given
      const projectConfigIdFromApi = {
        projectConfigurationId: 'projectConfigId',
        projectId: 'projectId'
      }

      // When
      const returns = mappingService.mapProjectConfigId(projectConfigIdFromApi)

      // Then
      expect(returns).to.deep.equal({
        projectConfigId: 'projectConfigId',
        projectId: 'projectId'
      })
    })
  })

  describe('map user', () => {
    it('should map user', () => {
      // Given
      const accountFromApi = {
        identifier: 'identifier',
        name: 'name',
        username: 'username',
        email: 'email'
      }

      // When
      const returns = mappingService.mapUser(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'identifier',
        name: 'name',
        userName: 'username',
        email: 'email'
      })
    })
  })

  describe('map project config', () => {
    afterEach(() => {
      mappingService.mapUser.restore()
      mappingService.mapStack.restore()
    })

    it('should map project config', () => {
      // Given
      const accountFromApi = {
        identifier: 'id',
        name: 'name',
        admins: [
          'admin1'
        ],
        stackConfigs: [
          'stack1',
          'stack2'
        ],
        users: [
          'userId1'
        ]
      }
      const mapUserSpy = sinon.stub(mappingService, 'mapUser', data => data)
      const mapStackSpy = sinon.stub(mappingService, 'mapStack', data => data)

      // When
      const returns = mappingService.mapProjectConfig(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'id',
        name: 'name',
        admins: [
          'admin1'
        ],
        stacks: [
          'stack1',
          'stack2'
        ],
        users:  [
          'userId1'
        ]
      })
      expect(mapUserSpy).to.have.callCount(2)
      expect(mapUserSpy).to.have.been.calledWith('admin1')
      expect(mapUserSpy).to.have.been.calledWith('userId1')
      expect(mapStackSpy).to.have.callCount(2)
      expect(mapStackSpy).to.have.been.calledWith('stack1')
      expect(mapStackSpy).to.have.been.calledWith('stack2')
    })
  })

  describe('map user', () => {
    it('should map user', () => {
      // Given
      const userFromApi = {
        identifier: 'id',
        name: 'name',
        username: 'userName',
        email: 'test@email.com'
      }

      // When
      const returns = mappingService.mapUser(userFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'id',
        name: 'name',
        userName: 'userName',
        email: 'test@email.com'
      })
    })
  })

  describe('map stack', () => {
    afterEach(() => {
      mappingService.mapBrick.restore()
    })

    it('should map stack', () => {
      // Given
      const stackFromApi = {
        type: 'type',
        name: 'name',
        brickConfigs: [
          'brick1',
          'brick2'
        ]
      }
      const mapBrickSpy = sinon.stub(mappingService, 'mapBrick', data => data)

      // When
      const returns = mappingService.mapStack(stackFromApi)

      // Then
      expect(returns).to.deep.equal({
        type: 'type',
        name: 'name',
        bricks: [
          'brick1',
          'brick2'
        ]
      })
      expect(mapBrickSpy).to.have.callCount(2)
      expect(mapBrickSpy).to.have.been.calledWith('brick1')
      expect(mapBrickSpy).to.have.been.calledWith('brick2')
    })
  })

  describe('map brick', () => {
    it('should map brick', () => {
      // Given
      const brickFromApi = {
        type: 'type',
        name: 'name',
        state: 'state',
        url: 'url'
      }

      // When
      const returns = mappingService.mapBrick(brickFromApi)

      // Then
      expect(returns).to.deep.equal({
        type: 'type',
        name: 'name',
        state: 'state',
        url: 'url'
      })
    })
  })

  describe('map brick event', () => {
    it('should map brick event', () => {
      // Given
      const brickEventFromApi = {
        entity: 'entity',
        action: 'action',
        data: {
          projectConfiguration: 'projectConfigId',
          brickType: 'brickType',
          brickName: 'brickName',
          state: 'state',
          url: 'url'
        }
      }

      // When
      const returns = mappingService.mapBrickEvent(brickEventFromApi)

      // Then
      expect(returns).to.deep.equal({
        entity: 'entity',
        action: 'action',
        data: {
          brickType: 'brickType',
          brickName: 'brickName',
          brickState: 'state',
          brickUrl: 'url'
        }
      })
    })
  })
})