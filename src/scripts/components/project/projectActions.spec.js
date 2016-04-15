import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'

import api from '../../commons/config'
import * as actions from './projectActions'
import { __RewireAPI__ as actionsRewireApi } from './projectActions'
import { PROJECT_CONFIG_REQUEST, PROJECT_CONFIG_SUCCESS, PROJECT_CONFIG_FAILURE } from '../../commons/constants'

// Apply the middleware to the store
const middlewares = [
  thunk,
  apiMiddleware
]
const mockStore = configureMockStore(middlewares)

describe('project actions', () => {
  describe('create project config', () => {
    let pushSpy,
        getHeadersSpy

    beforeEach(() => {
      pushSpy = sinon.spy()
      actionsRewireApi.__Rewire__('browserHistory', {
        push: pushSpy
      })
      getHeadersSpy = sinon.spy()
      actionsRewireApi.__Rewire__('getHeaders', getHeadersSpy)
    })

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('getHeaders')
      actionsRewireApi.__ResetDependency__('browserHistory')
      nock.cleanAll()
    })

    it('should create project config', (done) => {
      // Given
      const projectName = 'Acme',
            projectOwner = 'idUs3r',
            projectId = 'projectId'
      const expectedActions = [
        {
          type: PROJECT_CONFIG_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: PROJECT_CONFIG_SUCCESS,
          payload: {
            project: {
              id: projectId
            }
          },
          meta: undefined
        }
      ]
      nock('http://localhost')
        .post(`${api.projectConfig}`)
        .reply(201, () => {
          return projectId
        })

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.createProjectConfig(projectName, projectOwner)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(pushSpy).to.have.callCount(1)
        expect(pushSpy).to.have.been.calledWith(`/project/${projectId}`)
        expect(getHeadersSpy).to.have.callCount(1)
      }, done).then(done, done)
    })
  })
})