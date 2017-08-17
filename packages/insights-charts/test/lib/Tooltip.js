import { expect } from 'chai';
import { select } from 'd3-selection';
import { JSDOM } from 'jsdom';
import Tooltip from '../../source/js/lib/Tooltip';

// Essentially stub out a chart with jsdom, returning a d3 selection of the chart.
const getSelection = () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="chart"></div></body></html>');
  const elem = dom.window.document.querySelector('#chart');

  return select(elem);
};

describe('Tooltip', () => {
  it('should render a simple tooltip without data', () => {
    let seriesData;
    let dimensions;
    const dispatchers = { on: () => {} };
    const options = { enabled: true };

    const tooltip = new Tooltip(seriesData, dimensions, options, dispatchers);
    const selection = getSelection();

    tooltip.render(selection);

    const body = '<div class="reflect-charts-tooltip"><div class="reflect-charts-tooltip-header"></div><div class="reflect-charts-tooltip-content"></div></div>';

    expect(selection.html()).to.eql(body);
  });

  describe('moving the tooltip', () => {
    it('should properly render the tooltip for a single series chart', () => {
      const dispatchCallback = (eventName, cb) => {
        if (eventName === 'tooltipMove') {
          cb(0, 0, 'hello', [30, 30]);
        }
      };

      const seriesData = [{
        data: [{ y: 1 }, { y: 2 }],
        seriesIndex: 0,
        label: 'My series',
      }];

      const margins = { left: 20, right: 20, top: 20, bottom: 20 };
      const dimensions = { left: 20, right: 20, width: 400, margins };
      const dispatchers = { on: dispatchCallback };
      const options = { enabled: true };

      const tooltip = new Tooltip(seriesData, dimensions, options, dispatchers);
      const selection = getSelection();

      tooltip.render(selection);

      expect(selection.select('.reflect-charts-tooltip-header').text()).to.eql('hello');
      expect(selection.select('.reflect-charts-tooltip-value').text()).to.eql('1');
    });
  });
});
