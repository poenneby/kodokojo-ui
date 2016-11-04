/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'
import Promise from 'bluebird'

import api from '../../commons/config'
import * as actions from './projectConfig.actions'
import { __RewireAPI__ as actionsRewireApi } from './projectConfig.actions'
import {
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
  PROJECT_CONFIG_NEW_REQUEST,
  PROJECT_CONFIG_NEW_SUCCESS,
  PROJECT_CONFIG_NEW_FAILURE,
  PROJECT_CONFIG_ADD_USER_REQUEST,
  PROJECT_CONFIG_ADD_USER_SUCCESS,
  PROJECT_CONFIG_ADD_USER_FAILURE
} from '../../commons/constants'

// Apply the middleware to the store
const middlewares = [
  thunk,
  apiMiddleware
]
const mockStore = configureMockStore(middlewares)

describe('project config actions', () => {
  let historyPushSpy
  let getHeadersSpy
  let mapProjectConfigSpy

  beforeEach(() => {
    historyPushSpy = sinon.spy()
    actionsRewireApi.__Rewire__('browserHistory', {
      push: historyPushSpy
    })
    getHeadersSpy = sinon.spy()
    actionsRewireApi.__Rewire__('getHeaders', getHeadersSpy)
    mapProjectConfigSpy = sinon.stub()
    actionsRewireApi.__Rewire__('mapProjectConfig', mapProjectConfigSpy)
  })

  afterEach(() => {
    actionsRewireApi.__ResetDependency__('getHeaders')
    actionsRewireApi.__ResetDependency__('browserHistory')
    actionsRewireApi.__ResetDependency__('mapProjectConfig')
    nock.cleanAll()
  })

  describe('create project config', () => {
    let getProjectConfigSpy
    let createProjectSpy

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('getProjectConfig')
      actionsRewireApi.__ResetDependency__('createProject')
    })

    // TODO UT add test for users array and stackConfig params
    it('should create project config', (done) => {
      // Given
      const projectConfigName = 'Acme'
      const projectConfigAdmins = ['idUs3r']
      const projectConfigId = 'projectId'
      getProjectConfigSpy = sinon.stub().returns({
        type: 'MOCKED_GET_PROJECT_CONFIG'
      })
      actionsRewireApi.__Rewire__('getProjectConfig', getProjectConfigSpy)
      createProjectSpy = sinon.stub().returns({
        type: 'MOCKED_CREATE_PROJECT'
      })
      actionsRewireApi.__Rewire__('createProject', createProjectSpy)
      const expectedActions = [
        {
          type: PROJECT_CONFIG_NEW_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: PROJECT_CONFIG_NEW_SUCCESS,
          payload: {
            projectConfig: {
              id: projectConfigId
            }
          },
          meta: undefined
        },
        {
          type: 'MOCKED_GET_PROJECT_CONFIG'
        },
        {
          type: 'MOCKED_CREATE_PROJECT'
        }
      ]
      nock('http://localhost')
        .post(`${api.projectConfig}`)
        .reply(201, () => projectConfigId)

      // When
      const store = mockStore({
        projectConfig: {
          id: projectConfigId
        }
      })

      // Then
      return store.dispatch(actions.createProjectConfig(projectConfigName, projectConfigAdmins))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(mapProjectConfigSpy).to.have.callCount(0)
          expect(getProjectConfigSpy).to.have.callCount(1)
          expect(getProjectConfigSpy).to.have.been.calledWith(projectConfigId)
          expect(createProjectSpy).to.have.callCount(1)
          expect(createProjectSpy).to.have.been.calledWith(projectConfigId)
          expect(historyPushSpy).to.have.callCount(1)
          expect(historyPushSpy).to.have.been.calledWith('/stacks')
          done()
        })
        .catch(done)
    })
  })

  // TODO failure TU
  describe('get project config', () => {
    let getUserSpy
    let updateMenuProjectSpy

    beforeEach(() => {
      getUserSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION_USER_GET'
      })
      actionsRewireApi.__Rewire__('getUser', getUserSpy)
      updateMenuProjectSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION_UPDATE_MENU_PROJECT'
      })
      actionsRewireApi.__Rewire__('updateMenuProject', updateMenuProjectSpy)
    })

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('getUser')
      actionsRewireApi.__ResetDependency__('updateMenuProject')
    })

    it('should return project config', (done) => {
      // Given
      const projectConfigName = 'Acme'
      const projectConfigAdmins = [
        'idUs3r'
      ]
      const projectConfigId = 'projectId'
      const projectConfig = {
        id: projectConfigId,
        name: projectConfigName,
        admins: projectConfigAdmins,
        users: [
          'otherUserId'
        ]
      }
      mapProjectConfigSpy = sinon.stub().returns(projectConfig)
      actionsRewireApi.__Rewire__('mapProjectConfig', mapProjectConfigSpy)
      const expectedActions = [
        {
          type: PROJECT_CONFIG_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: {
            projectConfig
          },
          meta: undefined
        },
        {
          type: 'MOCKED_ACTION_USER_GET'
        },
        {
          type: 'MOCKED_ACTION_UPDATE_MENU_PROJECT'
        }
      ]
      nock('http://localhost')
        .get(`${api.projectConfig}/${projectConfigId}`)
        .reply(200, () => (
          {
            projectConfig
          }
        ))

      // When
      const store = mockStore({
        projectConfig
      })

      // Then
      return store.dispatch(actions.getProjectConfig(projectConfigId))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(mapProjectConfigSpy).to.have.callCount(1)
          expect(mapProjectConfigSpy).to.have.been.calledWith({
            projectConfig
          })
          expect(getUserSpy).to.have.callCount(1)
          expect(getUserSpy).to.have.calledWith('otherUserId')
          expect(updateMenuProjectSpy).to.have.callCount(1)
          expect(updateMenuProjectSpy).to.have.calledWith('Acme')
          done()
        })
        .catch(done)
    })
  })

  // TODO failure TU
  describe('add user to project config', () => {
    let createUserSpy
    let getProjectConfigSpy

    beforeEach(() => {
      createUserSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION',
        payload: {
          account: {
            identifier: 'otherUserId'
          }
        }
      })
      actionsRewireApi.__Rewire__('createUser', createUserSpy)
      getProjectConfigSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION'
      })
      actionsRewireApi.__Rewire__('getProjectConfig', getProjectConfigSpy)
    })

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('createUser')
      actionsRewireApi.__ResetDependency__('getProjectConfig')
    })

    it('should return project config', (done) => {
      // Given
      const projectConfigName = 'Acme'
      const projectConfigAdmins = ['idUs3r']
      const projectConfigId = 'projectId'
      const projectConfig = {
        id: projectConfigId,
        name: projectConfigName,
        admins: projectConfigAdmins,
        users: [
          { id: 'otherUserId' }
        ]
      }
      const userEmail = 'email@test.com'
      const expectedActions = [
        {
          type: 'MOCKED_ACTION',
          payload: {
            account: {
              identifier: 'otherUserId'
            }
          }
        },
        {
          type: PROJECT_CONFIG_ADD_USER_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: PROJECT_CONFIG_ADD_USER_SUCCESS,
          payload: undefined,
          meta: undefined
        },
        {
          type: 'MOCKED_ACTION'
        }
      ]
      nock('http://localhost')
        .put(`${api.projectConfig}/${projectConfigId}${api.projectConfigUser}`)
        .reply(200)

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.addUserToProjectConfig(projectConfigId, userEmail))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(createUserSpy).to.have.callCount(1)
          expect(createUserSpy).to.have.calledWith(userEmail)
          done()
        })
        .catch(done)
    })
  })
})
