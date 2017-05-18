//
// This file sets up the JSDom environment to use actual markup. It's ran
// before any of the other code is ran, and must be ran before React required
// because...reasons.
//
// NOTE: This is done in ES5 because we don't have Babel available by the time we get started.
const baseMarkup = '<!DOCTYPE html><html><head><title></title></head><body></body></html>';
const window = require('jsdom').jsdom(baseMarkup).defaultView;

global.window = window;
global.document = window.document;
global.navigator = window.navigator;
