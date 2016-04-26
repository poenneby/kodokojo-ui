import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'

import api from '../../commons/config'
import * as actions from './projectConfig.actions'
import { __RewireAPI__ as actionsRewireApi } from './projectConfig.actions'
import {
  PROJECT_CONFIG_REQUEST,
  PROJECT_CONFIG_SUCCESS,
  PROJECT_CONFIG_FAILURE,
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
  let historyPushSpy,
      getHeadersSpy,
      mapProjectConfigSpy

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

  // TODO failure TU
  describe('create project config', () => {
    let getProjectConfigSpy

    beforeEach(() => {
      getProjectConfigSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION'
      })
      actionsRewireApi.__Rewire__('getProjectConfig', getProjectConfigSpy)
    })

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('getProjectConfig')
    })

    it('should create project config', (done) => {
      // Given
      const projectConfigName = 'Acme',
            projectConfigOwner = 'idUs3r',
            projectConfigId = 'projectId'
      const expectedActions = [
        {
          type: PROJECT_CONFIG_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: {
            projectConfig: {
              id: projectConfigId
            }
          },
          meta: undefined
        },
        {
          type: 'MOCKED_ACTION'
        }
      ]
      nock('http://localhost')
        .post(`${api.projectConfig}`)
        .reply(201, () => {
          return projectConfigId
        })

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.createProjectConfig(projectConfigName, projectConfigOwner)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(historyPushSpy).to.have.callCount(1)
        expect(historyPushSpy).to.have.been.calledWith('/projectConfig')
        expect(getHeadersSpy).to.have.callCount(1)
        expect(mapProjectConfigSpy).to.have.callCount(0)
        expect(getProjectConfigSpy).to.have.callCount(1)
        expect(getProjectConfigSpy).to.have.calledWith(projectConfigId)
      }, done).then(done, done)
    })

    // TODO failure TU
    describe('get project config', () => {
      let getUserSpy

      beforeEach(() => {
        getUserSpy = sinon.stub().returns({
          type: 'MOCKED_ACTION'
        })
        actionsRewireApi.__Rewire__('getUser', getUserSpy)
      })

      afterEach(() => {
        actionsRewireApi.__ResetDependency__('getUser')
      })

      it('should return project config', (done) => {
        // Given
        const projectConfigName = 'Acme',
              projectConfigOwner = 'idUs3r',
              projectConfigId = 'projectId',
              projectConfig = {
                id: projectConfigId,
                name: projectConfigName,
                owner: projectConfigOwner,
                users: [
                  { id: 'otherUserId' }
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
              projectConfig: projectConfig
            },
            meta: undefined
          },
          {
            type: 'MOCKED_ACTION'
          }
        ]
        nock('http://localhost')
          .get(`${api.projectConfig}/${projectConfigId}`)
          .reply(200, () => {
            return {
              projectConfig: projectConfig
            }
          })

        // When
        const store = mockStore({})

        // Then
        return store.dispatch(actions.getProjectConfig(projectConfigId)).then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(mapProjectConfigSpy).to.have.callCount(1)
          expect(mapProjectConfigSpy).to.have.been.calledWith({
            projectConfig: projectConfig
          })
          expect(getUserSpy).to.have.callCount(1)
          expect(getUserSpy).to.have.calledWith('otherUserId')
        }, done).then(done, done)
      })
    })

    // TODO failure TU
    describe('add user to project config', () => {
      let createUserSpy

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
        const projectConfigName = 'Acme',
              projectConfigOwner = 'idUs3r',
              projectConfigId = 'projectId',
              projectConfig = {
                id: projectConfigId,
                name: projectConfigName,
                owner: projectConfigOwner,
                users: [
                  { id: 'otherUserId' }
                ]
              },
              userEmail = 'email@test.com'
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
        return store.dispatch(actions.addUserToProjectConfig(projectConfigId, userEmail)).then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(createUserSpy).to.have.callCount(1)
          expect(createUserSpy).to.have.calledWith(userEmail)
        }, done).then(done, done)
      })
    })
  })
})