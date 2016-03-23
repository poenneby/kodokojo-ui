import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
})
global.window = document.defaultView
global.navigator = global.window.navigator

/**
 * Mocking local and session Storage
 */
function storageMock() {
  var storage = {};

  return {
    setItem: (key, value) => storage[key] = value || '',
    getItem: (key) => storage[key] || null,
    removeItem: (key) => delete storage[key],
    length: () => Object.keys(storage).length,
    key: (i) => {
      var keys = Object.keys(storage)
      return keys[i] || null
    }
  }
}

// mock the localStorage
global.window.localStorage = storageMock()

// mock the sessionStorage
global.window.sessionStorage = storageMock()
