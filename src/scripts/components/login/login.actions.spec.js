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

import api from '../../commons/config'
import * as actions from './login.actions.js'
import { __RewireAPI__ as actionsRewireApi } from './login.actions.js'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../../commons/constants'

// dependencies to mock
import authService from '../../services/auth.service'
import ioService from '../../services/io.service'

// Apply the middleware to the store
const middlewares = [
  thunk,
  apiMiddleware
]
const mockStore = configureMockStore(middlewares)

describe('login actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('login', () => {
    let mapAccountSpy
    let historyPushSpy
    let getProjectConfigAndProjectSpy

    beforeEach(() => {
      historyPushSpy = sinon.spy()
      actionsRewireApi.__Rewire__('browserHistory', {
        push: historyPushSpy
      })
      getProjectConfigAndProjectSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION'
      })
      actionsRewireApi.__Rewire__('getProjectConfigAndProject', getProjectConfigAndProjectSpy)
    })

    afterEach(() => {
      authService.setAuth.restore()
      authService.putAuth.restore()
      ioService.getHeaders.restore()
      actionsRewireApi.__ResetDependency__('mapAccount')
      actionsRewireApi.__ResetDependency__('browserHistory')
      actionsRewireApi.__ResetDependency__('getProjectConfigAndProject')
      actionsRewireApi.__ResetDependency__('putAuth')
      actionsRewireApi.__ResetDependency__('requestAuthentication')
    })

    it('should request auth', (done) => {
      // Given
      const username = 'test'
      const password = 'psUs3r'
      const auth = 'cryptedAuth'
      const account = {
        id: 'idUs3r',
        projectConfigIds: [
          {
            projectConfigId: 'projectConfigId',
            projectId: 'projectId'
          }
        ]
      }
      const expectedActions = [
        {
          type: AUTH_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: AUTH_SUCCESS,
          payload: {
            account
          },
          meta: undefined
        },
        {
          type: 'MOCKED_ACTION'
        }
      ]
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      }
      const setAuthSpy = sinon.stub(authService, 'setAuth').returns(auth)
      const putAuthSpy = sinon.spy(authService, 'putAuth')
      const getHeadersSpy = sinon.stub(ioService, 'getHeaders').returns(headers)
      mapAccountSpy = sinon.stub().returns(account)
      actionsRewireApi.__Rewire__('mapAccount', mapAccountSpy)
      nock('http://localhost', {
        reqheaders: {
          Authorization: `Basic ${auth}`
        }
      }).get(`${api.user}`)
        .reply(200, () => account)


      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(setAuthSpy).to.have.callCount(1)
        expect(setAuthSpy).to.have.been.calledWith(username, password)
        expect(putAuthSpy).to.have.callCount(1)
        expect(putAuthSpy).to.have.been.calledWith(account.id)
        expect(getHeadersSpy).to.have.callCount(1)
        expect(getProjectConfigAndProjectSpy).to.have.callCount(1)
        expect(historyPushSpy).to.have.callCount(1)
        expect(historyPushSpy).to.have.been.calledWith('/stacks')
        done()
      }).catch(done)
    })

    it('should redirect to first project', (done) => {
      // Given
      const username = 'test'
      const password = 'psUs3r'
      const auth = 'cryptedAuth'
      const account = {
        id: 'idUs3r',
        projectConfigIds: []
      }
      const requestAuthenticationSpy = sinon.stub().returns({
        type: 'MOCKED_ACTION',
        payload: {
          account
        }
      })
      actionsRewireApi.__Rewire__('requestAuthentication', requestAuthenticationSpy)
      const setAuthSpy = sinon.stub(authService, 'setAuth').returns(auth)
      const putAuthSpy = sinon.spy(authService, 'putAuth')
      const getHeadersSpy = sinon.spy(ioService, 'getHeaders')
      const expectedActions = [
        {
          type: 'MOCKED_ACTION',
          payload: {
            account
          }
        }
      ]

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(setAuthSpy).to.have.callCount(1)
        expect(setAuthSpy).to.have.been.calledWith(username, password)
        expect(putAuthSpy).to.have.callCount(1)
        expect(putAuthSpy).to.have.been.calledWith(account.id)
        expect(getHeadersSpy).to.have.not.been.called
        expect(requestAuthenticationSpy).to.have.callCount(1)
        expect(historyPushSpy).to.have.callCount(1)
        expect(historyPushSpy).to.have.been.calledWith('/firstProject')
        done()
      }).catch(done)
    })

    it('should fail to request auth', (done) => {
      // Given
      const username = 'test'
      const password = 'psUs3r'
      const auth = 'cryptedAuth'
      const expectedActions = [
        {
          type: AUTH_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: AUTH_FAILURE,
          error: true,
          payload: {
            message: '401 - Unauthorized',
            name: 'ApiError',
            response: undefined,
            status: 401,
            statusText: 'Unauthorized'
          },
          meta: undefined
        }
      ]
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      }
      const setAuthSpy = sinon.stub(authService, 'setAuth').returns(auth)
      const putAuthSpy = sinon.spy(authService, 'putAuth')
      const getHeadersSpy = sinon.stub(ioService, 'getHeaders').returns(headers)
      nock('http://localhost', {
        reqheaders: {
          Authorization: `Basic ${auth}`
        }
      }).get(`${api.user}`)
        .reply(401)

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password))
        .then(() => {
          done(new Error('This fail case test passed'))
        })
        .catch(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(setAuthSpy).to.have.callCount(1)
          expect(setAuthSpy).to.have.been.calledWith(username, password)
          expect(putAuthSpy).to.have.callCount(0)
          expect(getHeadersSpy).to.have.callCount(1)
          done()
        })
    })
  })

  describe('logout', () => {
    it('should reset auth', (done) => {
      // Given
      const expectedActions = [
        {
          type: AUTH_RESET
        }
      ]
      const resetAuthSpy = sinon.spy(authService, 'resetAuth')

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.logout())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(resetAuthSpy).to.have.callCount(1)
          done()
        }).catch(done)
    })
  })
})
