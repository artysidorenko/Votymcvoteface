import { JSDOM } from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

// previously was jsdom.jsdom(content) - breaking change with update
global.dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
global.window = dom.window
global.document = dom.window.document
global.navigator = global.window.navigator

// Hoist window object's properties directly onto global object
// (required for some parts of React code)
Object.keys(window).forEach(key => {
  if (!(key in global)) global[key] = window[key]
})

chai.use(chaiImmutable)