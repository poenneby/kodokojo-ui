import { expect } from 'chai'

import { returnErrorKey } from './errorService'

describe('error service', () => {

  describe('returnError key', () => {
    it('should return key', () => {
      // Given
      const component = 'component',
            action = 'do-something',
            status = '404'

      // When
      const returns = returnErrorKey(component, action, status)

      // Then
      expect(returns).to.equal('component-do-something-404')
    })
  })
})