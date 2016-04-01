import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'

import * as actions from './loginActions'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../../commons/constants'

// dependencies to mock
import authService from '../../services/authService'

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
      authService.getAuth.restore()
      authService.setAuth.restore()
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
      nock('http://localhost/api/v1', {
          reqheaders: {
            'Authorization': `Basic ${auth}`
          }
        })
        .get('/user')
        .reply(200, (uri, requestBody) => {
          return account
        })
      const getAuthSpy = sinon.stub(authService, 'getAuth').returns(auth)
      const setAuthSpy = sinon.spy(authService, 'setAuth')

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(getAuthSpy).to.have.callCount(1)
        expect(getAuthSpy).to.have.been.calledWith(username, password)
        expect(setAuthSpy).to.have.callCount(1)
        expect(setAuthSpy).to.have.been.calledWith(account.identifier)
      }).then(done, done)
    })

    it('should fail to request auth', (done) => {
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
      nock('http://localhost/api/v1', {
          reqheaders: {
            'Authorization': `Basic ${auth}`
          }
        })
        .get('/user')
        .reply(401)
      const getAuthSpy = sinon.stub(authService, 'getAuth').returns(auth)
      const setAuthSpy = sinon.spy(authService, 'setAuth')

      // When
      const store = mockStore({})

      // Then
      return store.dispatch(actions.login(username, password)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
        expect(getAuthSpy).to.have.callCount(1)
        expect(getAuthSpy).to.have.been.calledWith(username, password)
        expect(setAuthSpy).to.have.callCount(0)
      }).then(done, done)
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
      }).then(done, done)
    })
  })
})
