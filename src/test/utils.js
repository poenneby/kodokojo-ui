import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

//
// function storageMock() {
//   var storage = {};
//
//   return {
//     setItem: (key, value) => storage[key] = value || '',
//     getItem: (key) => storage[key] || null,
//     removeItem: (key) => delete storage[key],
//     length: () => Object.keys(storage).length,
//     key: (i) => {
//       var keys = Object.keys(storage)
//       return keys[i] || null
//     }
//   }
// }
//
// // mock the localStorage
// global.window.localStorage = storageMock()
// global.window.sessionStorage = storageMock()
//
// // mock the sessionStorage
// global.window.sessionStorage = storageMock()
