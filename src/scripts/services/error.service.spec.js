/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import { expect } from 'chai'

import { returnErrorKey } from './error.service'

describe('error service', () => {
  describe('returnError key', () => {

    it('should return default key', () => {
      // Given
      const errorObject = {}

      // When
      const returns = returnErrorKey(errorObject)

      // Then
      expect(returns).to.equal('error')
    })

    it('should return key with component', () => {
      // Given
      const errorObject = {
        component: 'component'
      }

      // When
      const returns = returnErrorKey(errorObject)

      // Then
      expect(returns).to.equal('component-error')
    })

    it('should return key with action', () => {
      // Given
      const errorObject = {
        action: 'action'
      }

      // When
      const returns = returnErrorKey(errorObject)

      // Then
      expect(returns).to.equal('action-error')
    })

    it('should return key with code', () => {
      // Given
      const errorObject = {
        code: '404'
      }

      // When
      const returns = returnErrorKey(errorObject)

      // Then
      expect(returns).to.equal('error-404')
    })

    it('should return key with all parameters', () => {
      // Given
      const errorObject = {
        component: 'component',
        action: 'do-something',
        code: '404'
      }

      // When
      const returns = returnErrorKey(errorObject)

      // Then
      expect(returns).to.equal('component-do-something-error-404')
    })
  })
})
