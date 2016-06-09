/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import { expect } from 'chai'

import { returnErrorKey } from './error.service'

describe('error service', () => {
  describe('returnError key', () => {
    it('should return key', () => {
      // Given
      const component = 'component'
      const action = 'do-something'
      const status = '404'

      // When
      const returns = returnErrorKey(component, action, status)

      // Then
      expect(returns).to.equal('component-do-something-404')
    })
  })
})
