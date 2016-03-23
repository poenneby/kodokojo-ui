import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as actions from './signinActions'
import * as ActionsTypes from '../../commons/constants'

// Apply the middleware to the store
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const config = {}

describe('signin actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  beforeEach(() => {

  })

  it('should return ACCOUNT_ID_REQUEST action', () => {
    // Given
    const email = 'test@email.com'
    const expectedAction = {
      type: ActionsTypes.ACCOUNT_ID_REQUEST,
      email: email
    }
    // When
    const action = actions.initAccountId(email)

    // Then
    expect(action).to.deep.equal(expectedAction)
  })

  it('should return ACCOUNT_ID_REQUEST action', () => {
    // Given
    const accountId = 'accountId'
    const expectedAction = {
      type: ActionsTypes.ACCOUNT_ID_SUCCESS,
      payload: {
        account: {
          id: accountId
        }
      }
    }
    // When
    const action = actions.returnAccountId(accountId)

    // Then
    expect(action).to.deep.equal(expectedAction)
  })

  it('should return ACCOUNT_REQUEST action', () => {
    // Given
    const expectedAction = {
      type: ActionsTypes.ACCOUNT_REQUEST
    }
    // When
    const action = actions.initAccount()

    // Then
    expect(action).to.deep.equal(expectedAction)
  })

  // FIXME work if npm test, fail on npm coverage
  it('should return ACCOUNT_SUCCESS action')//, () => {
  //   // Given
  //
  //   let browserHistory = {
  //     push: () => {}
  //   }
  //   const mockPush = sinon.stub(browserHistory, 'push').returns({})
  //   const data = { data: 'data' }
  //   const expectedAction = {
  //     type: ActionsTypes.ACCOUNT_SUCCESS,
  //     payload: {
  //       account: data
  //     }
  //   }
  //   // When
  //   const store = mockStore({})
  //   store.dispatch(actions.returnAccount(data))
  //   const actionsFinal = store.getActions()
  //
  //   // Then
  //   expect(actionsFinal).to.deep.equal([expectedAction])
  //   // FIXME
  //   // expect(mockPush).to.have.callCount(1)
  // })

  // FIXME work if npm test, fail on npm coverage
  it('should return ACCOUNT_SUCCESS action')//, () => {
  //   // Given
  //   let browserHistory = {
  //     push: () => {}
  //   }
  //   const mockPush = sinon.stub(browserHistory, 'push').returns({})
  //   const data = { data: 'data' }
  //   const expectedAction = {
  //     type: ActionsTypes.ACCOUNT_SUCCESS,
  //     payload: {
  //       account: data
  //     }
  //   }
  //   // When
  //   const action = actions.returnAccount(data)
  //
  //   // Then
  //   expect(action).to.deep.equal(expectedAction)
  //   // FIXME
  //   // expect(mockPush).to.have.callCount(1)
  // })

  it('should creates account ')//, (done) => {
  //   console.log('host', window.location.host)
  //   nock('http://fakeHost.io/api/v1/')
  //       .post('/user')
  //       .reply(20000, { body: { todos: ['do something'] } })
  //
  //   const expectedActions = [
  //     { type: ActionsTypes.ACCOUNT_ID_REQUEST, email: '' },
  //     { type: ActionsTypes.ACCOUNT_ID_SUCCESS, body: { todos: ['do something'] } }
  //   ]
  //   const store = mockStore({
  //     account: {},
  //     isFetching: false
  //   }, expectedActions, done)
  //   store.dispatch(actions.createAccount())
  // })
})