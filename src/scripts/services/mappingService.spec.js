import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import mappingService from './mappingService'

describe('mapping service', () => {

  describe('map account', () => {
    it('should map account', () => {
      // Given
      const accountFromApi = {
        identifier: 'identifier',
        name: 'name',
        username: 'username',
        email: 'email',
        password: 'password',
        sshPublicKey: 'sshPublicKey',
        privateKey: 'privateKey'
      }

      // When
      var returns = mappingService.mapAccount(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'identifier',
        name: 'name',
        userName: 'username',
        email: 'email',
        password: 'password',
        sshKeyPublic: 'sshPublicKey',
        sshKeyPrivate: 'privateKey'
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
      var returns = mappingService.mapUser(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'identifier',
        name: 'name',
        userName: 'username',
        email: 'email'
      })

    })
  })

  describe('map project', () => {

    it('should map project', () => {
      // Given
      const accountFromApi = {
        identifier: 'id',
        name: 'name',
        owner: 'ownerId',
        stackConfigs: [
          'stack'
        ],
        users: [
          'userId1'
        ]
      }
      const mapUserSpy = sinon.stub(mappingService, 'mapUser', data => data)

      // When
      var returns = mappingService.mapProjectConfig(accountFromApi)

      // Then
      expect(returns).to.deep.equal({
        id: 'id',
        name: 'name',
        owner: 'ownerId',
        stacks: [
          'stack'
        ],
        users:  [
          'userId1'
        ]
      })
      expect(mapUserSpy).to.have.callCount(2)
      expect(mapUserSpy).to.have.been.calledWith('ownerId')
      expect(mapUserSpy).to.have.been.calledWith('userId1')
    })
  })
})