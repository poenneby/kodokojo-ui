import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'

import api from '../../commons/config'
import * as actions from './login.actions'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../../commons/constants'

// dependencies to mock
import authService from '../../services/authService'
import ioService from '../../services/ioService'

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
    afterEach(() => {
      authService.setAuth.restore()
      authService.putAuth.restore()
      ioService.getHeaders.restore()
    })

    it('should request auth', (done) => {
      // Given
      const username = 'test',
            password = 'psUs3r',
            auth = 'cryptedAuth',
            account = {
              identifier: 'idUs3r'
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
            account: account
          },
          meta: undefined
        }
      ]
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
      const setAuthSpy = sinon.stub(authService, 'setAuth').returns(auth)
      const putAuthSpy = sinon.spy(authService, 'putAuth')
      const getHeadersSpy = sinon.stub(ioService, 'getHeaders').returns(headers)
      nock('http://localhost', {
        reqheaders: {
          'Authorization': `Basic ${auth}`
        }
      }).get(`${api.user}`)
        .reply(200, () => {
          return account
        })


      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(setAuthSpy).to.have.callCount(1)
        expect(setAuthSpy).to.have.been.calledWith(username, password)
        expect(putAuthSpy).to.have.callCount(1)
        expect(putAuthSpy).to.have.been.calledWith(account.identifier)
        expect(getHeadersSpy).to.have.callCount(1)
        done()
      }, done)
    })

    it('should fail to request auth', (done) => {
      // Given
      const username = 'test',
            password = 'psUs3r',
            auth = 'cryptedAuth'
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
      const setAuthSpy = sinon.stub(authService, 'setAuth').returns(auth)
      const putAuthSpy = sinon.spy(authService, 'putAuth')
      const getHeadersSpy = sinon.stub(ioService, 'getHeaders').returns(headers)
      nock('http://localhost', {
        reqheaders: {
          'Authorization': `Basic ${auth}`
        }
      }).get(`${api.user}`)
        .reply(401)

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(setAuthSpy).to.have.callCount(1)
        expect(setAuthSpy).to.have.been.calledWith(username, password)
        expect(putAuthSpy).to.have.callCount(0)
        expect(getHeadersSpy).to.have.callCount(1)
        done()
      }, done)
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
      return store.dispatch(actions.logout()).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(resetAuthSpy).to.have.callCount(1)
        done()
      }, done)
    })
  })
})
