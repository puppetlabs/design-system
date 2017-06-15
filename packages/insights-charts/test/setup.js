import { JSDOM } from 'jsdom';
import { select } from 'd3-selection';

const doc = new JSDOM('<body><svg id="chart"></svg></body>');

global.window = doc.window;
global.document = doc.window.document;
global.chart = select('#chart');

afterEach(() => {
  global.chart.node().innerHTML = '';
});
