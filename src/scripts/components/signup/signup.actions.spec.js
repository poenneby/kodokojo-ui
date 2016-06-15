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

// dependencies to mock
import websocketService from '../../services/websocket.service'

import api from '../../commons/config'
import * as actions from './signup.actions.js'
import { __RewireAPI__ as actionsRewireApi } from './signup.actions.js'
import {
  ACCOUNT_NEW_ID_REQUEST,
  ACCOUNT_NEW_ID_SUCCESS,
  ACCOUNT_NEW_ID_FAILURE,
  ACCOUNT_NEW_REQUEST,
  ACCOUNT_NEW_SUCCESS,
  ACCOUNT_NEW_FAILURE
} from '../../commons/constants'

// Apply the middleware to the store
const middlewares = [
  thunk,
  apiMiddleware
]
const mockStore = configureMockStore(middlewares)

describe('signup actions', () => {
  describe('create auth', () => {
    let pushHistorySpy
    let getHeadersSpy
    let setAuthSpy
    let putAuthSpy
    let mapAccountSpy
    let websocketServiceInitSpy

    beforeEach(() => {
      pushHistorySpy = sinon.spy()
      actionsRewireApi.__Rewire__('browserHistory', {
        push: pushHistorySpy
      })
      getHeadersSpy = sinon.spy()
      actionsRewireApi.__Rewire__('getHeaders', getHeadersSpy)
      setAuthSpy = sinon.spy()
      actionsRewireApi.__Rewire__('setAuth', setAuthSpy)
      putAuthSpy = sinon.spy()
      actionsRewireApi.__Rewire__('putAuth', putAuthSpy)
      websocketServiceInitSpy = sinon.stub(websocketService, 'initSocket').returns(Promise.resolve())
    })

    afterEach(() => {
      actionsRewireApi.__ResetDependency__('getHeaders')
      actionsRewireApi.__ResetDependency__('browserHistory')
      actionsRewireApi.__ResetDependency__('setAuth')
      actionsRewireApi.__ResetDependency__('putAuth')
      actionsRewireApi.__ResetDependency__('mapAccount')
      websocketService.initSocket.restore()
      nock.cleanAll()
    })

    it('should create auth', (done) => {
      // Given
      const email = 'test@email.com'
      const id = 'idUs3r'
      const account = {
        id,
        userName: 'test',
        password: 'password'
      }
      const expectedActions = [
        {
          type: ACCOUNT_NEW_ID_REQUEST,
          payload: {
            email
          },
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_ID_SUCCESS,
          payload: {
            account: {
              id
            }
          },
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_SUCCESS,
          payload: {
            account: {
              id,
              userName: 'test',
              password: 'password'
            }
          },
          meta: undefined
        }
      ]
      nock('http://localhost')
        .post(`${api.user}`)
        .reply(201, () => id)
        .post(`${api.user}/${id}`)
        .reply(201, () => account)

      mapAccountSpy = sinon.stub().returns(account)
      actionsRewireApi.__Rewire__('mapAccount', mapAccountSpy)

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.createAccount(email))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(pushHistorySpy).to.have.callCount(1)
          expect(pushHistorySpy).to.have.been.calledWith('/firstProject')
          expect(getHeadersSpy).to.have.callCount(2)
          expect(setAuthSpy).to.have.callCount(1)
          expect(setAuthSpy).to.have.been.calledWith('test', 'password')
          expect(putAuthSpy).to.have.callCount(1)
          expect(putAuthSpy).to.have.been.calledWith(id)
          expect(websocketServiceInitSpy).to.have.callCount(1)
          done()
        })
        .catch(done)
    })

    it('should fail to create auth id', (done) => {
      // Given
      const email = 'test@email.com'
      const expectedActions = [
        {
          type: ACCOUNT_NEW_ID_REQUEST,
          payload: {
            email
          },
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_ID_FAILURE,
          error: true,
          payload: {
            message: '500 - Internal Server Error',
            name: 'ApiError',
            response: {
              error: 'error'
            },
            status: 500,
            statusText: 'Internal Server Error'
          },
          meta: undefined
        }
      ]
      nock('http://localhost')
        .post(`${api.user}`)
        .reply(500, {
          error: 'error'
        })

      // When
      const store = mockStore({
        account: {
          id: ''
        }
      })

      // Then
      return store.dispatch(actions.createAccount(email))
        .then(done, () => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(pushHistorySpy).to.have.callCount(0)
          expect(getHeadersSpy).to.have.callCount(1)
          expect(setAuthSpy).to.have.callCount(0)
          expect(putAuthSpy).to.have.callCount(0)
          expect(websocketServiceInitSpy).to.have.callCount(0)
          done()
        })
        .catch(done)
    })

    it('should fail to create auth', (done) => {
      // Given
      const email = 'test@email.com'
      const id = 'idUs3r'
      const expectedActions = [
        {
          type: ACCOUNT_NEW_ID_REQUEST,
          payload: {
            email
          },
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_ID_SUCCESS,
          payload: {
            account: {
              id
            }
          },
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_REQUEST,
          payload: undefined,
          meta: undefined
        },
        {
          type: ACCOUNT_NEW_FAILURE,
          error: true,
          payload: {
            message: '500 - Internal Server Error',
            name: 'ApiError',
            response: {
              error: 'error'
            },
            status: 500,
            statusText: 'Internal Server Error'
          },
          meta: undefined
        }
      ]
      nock('http://localhost')
        .post(`${api.user}`)
        .reply(200, () => id)
        .post(`${api.user}/${id}`)
        .reply(500, {
          error: 'error'
        })


      // When
      const store = mockStore({
        account: {
          id: ''
        }
      })

      // Then
      return store.dispatch(actions.createAccount(email))
        .then(() => {
          done(new Error('This fail case test passed'))
        })
        .catch(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
          expect(pushHistorySpy).to.have.callCount(0)
          expect(getHeadersSpy).to.have.callCount(2)
          expect(setAuthSpy).to.have.callCount(0)
          expect(putAuthSpy).to.have.callCount(0)
          expect(websocketServiceInitSpy).to.have.callCount(0)
          done()
        })
    })
  })
})
