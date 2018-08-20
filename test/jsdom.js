const { JSDOM } = require('jsdom');
//
// This file sets up the JSDom environment to use actual markup. It's ran
// before any of the other code is ran, and must be ran before React required
// because...reasons.
//
// NOTE: This is done in ES5 because we don't have Babel available by the time we get started.
const baseMarkup =
  '<!DOCTYPE html><html><head><title></title></head><body></body></html>';
const jsdom = new JSDOM(baseMarkup);

global.window = jsdom.window;
global.document = jsdom.window.document;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);
