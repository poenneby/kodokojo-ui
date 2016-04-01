import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import configureMockStore from 'redux-mock-store'

import * as actions from './signinActions'
import { __RewireAPI__ as  actionsRewireApi } from './signinActions'
import { ACCOUNT_ID_REQUEST, ACCOUNT_ID_SUCCESS, ACCOUNT_REQUEST, ACCOUNT_SUCCESS } from '../../commons/constants'

// Apply the middleware to the store
const middlewares = [
  thunk,
  apiMiddleware
]
const mockStore = configureMockStore(middlewares)

describe('signin actions', () => {

  afterEach(() => {
    nock.cleanAll()
    actionsRewireApi.__ResetDependency__('browserHistory')
  })

  it('should create account', (done) => {
    // Given
    const email = 'test@email.com'
    const id = 'idUs3r'
    const expectedActions = [
      {
        type: ACCOUNT_ID_REQUEST,
        payload: {
          email: email
        },
        meta: undefined
      },
      {
        type: ACCOUNT_ID_SUCCESS,
        payload: {
          account: {
            id: id
          }
        },
        meta: undefined
      },
      {
        type: ACCOUNT_REQUEST,
        payload: undefined,
        meta: undefined
      },
      {
        type: ACCOUNT_SUCCESS,
        payload: {
          account: {
            id: id
          }
        },
        meta: undefined
      }
    ]
    nock('http://localhost/api/v1')
        .post('/user')
        .reply(200, () => {
          return id
        })
        .post(`/user/${id}`)
        .reply(200, {id: id })
    var pushSpy = sinon.spy()
    actionsRewireApi.__Rewire__('browserHistory', {
      push: pushSpy
    })

    // When
    const store = mockStore({})

    // Then
    return store.dispatch(actions.createAccount(email)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
      expect(pushSpy).to.have.callCount(1)
      expect(pushSpy).to.have.been.calledWith('/project')
    }).then(done, done)
  })

})

//TODO fail cases