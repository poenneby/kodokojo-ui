/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import ioService from './ioService'

describe('io service', () => {
  describe('getHeaders method', () => {
    afterEach(() => {
      ioService.__ResetDependency__('getToken')
    })

    it('should return basic headers', () => {
      // Given
      const getTokenSpy = sinon.stub().returns('')
      ioService.__Rewire__('getToken', getTokenSpy)

      // When
      const returned = ioService.getHeaders()

      // Then
      expect(returned).to.be.deep.equal({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
      expect(getTokenSpy).to.have.callCount(1)
      expect(getTokenSpy).to.have.calledWith()
    })

    it('should return headers with autorization set', () => {
      // Given
      const getTokenSpy = sinon.stub().returns('token')
      ioService.__Rewire__('getToken', getTokenSpy)

      // When
      const returned = ioService.getHeaders()

      // Then
      expect(returned).to.be.deep.equal({
        Accept: 'application/json',
        Authorization: 'Basic token',
        'Content-Type': 'application/json'
      })
      expect(getTokenSpy).to.have.callCount(1)
      expect(getTokenSpy).to.have.calledWith()
    })

    it('should return headers merged wioth param', () => {
      // Given
      const getTokenSpy = sinon.stub().returns('token')
      ioService.__Rewire__('getToken', getTokenSpy)
      const customHeaders = {
        Accept: 'application/xml',
        Authorization: 'is not rewritable',
        SuperCustomHeader: 'super'
      }

      // When
      const returned = ioService.getHeaders(customHeaders)

      // Then
      expect(returned).to.be.deep.equal({
        Accept: 'application/xml',
        Authorization: 'Basic token',
        'Content-Type': 'application/json',
        SuperCustomHeader: 'super'
      })
      expect(getTokenSpy).to.have.callCount(1)
      expect(getTokenSpy).to.have.calledWith()
    })
  })
})
