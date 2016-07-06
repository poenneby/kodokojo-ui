/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-return-assign */

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import websocketMiddleware, { websocket } from './websocket.middleware'
import api from '../commons/config'
import {
  WEBSOCKET_REQUEST,
  WEBSOCKET_STOP
} from '../commons/constants'

describe('websocket middleware', () => {
  describe('websocket state', () => {
    it('should init websocket', () => {
      // Given

      // When

      // Then
      expect(websocket).to.deep.equal({
        socket: undefined,
        socketPing: undefined,
        uri: `ws://localhost${api.event}`
      })
    })
  })

  describe('middleware', () => {
    let getStateSpy
    let createFakeStore
    let dispatchWithStoreOf
    let getWebSocketSpy
    let websocketCloseSpy

    beforeEach(() => {
      websocketCloseSpy = sinon.stub()
      getWebSocketSpy = sinon.stub().returns({
        close: getWebSocketSpy
      })
      websocketMiddleware.__Rewire__('getWebSocket', getWebSocketSpy)

      createFakeStore = fakeData => ({
        getState() {
          getStateSpy = sinon.stub().returns(fakeData)
          return getStateSpy
        }
      })

      dispatchWithStoreOf = (storeData, action) => {
        let dispatched = null
        const dispatch = websocketMiddleware(createFakeStore(storeData))(actionAttempt => dispatched = actionAttempt)
        dispatch(action)
        return dispatched
      }
    })

    afterEach(() => {
      websocketMiddleware.__ResetDependency__('getWebSocket')
      websocketMiddleware.__ResetDependency__('websocket')
    })

    it('should pass action if not websocket type', () => {
      // Given
      const action = {
        type: 'SOMETHING_ELSE'
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
    })

    it('should set new websocket', () => {
      // Given
      const action = {
        type: WEBSOCKET_REQUEST
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
      expect(getWebSocketSpy).to.have.callCount(1)
      expect(getWebSocketSpy).to.have.been.calledWith(`ws://localhost${api.event}`)
    })

    it('should stop websocket', () => {
      // Given
      const action = {
        type: WEBSOCKET_STOP
      }

      // When
      const appliMiddleware = dispatchWithStoreOf({}, action)

      // Then
      expect(appliMiddleware).to.deep.equal(action)
      // FIXME can't test that.. ?
      // expect(websocketCloseSpy).to.have.callCount(1)
    })
  })
})
