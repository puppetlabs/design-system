import { expect } from 'chai';
import { select } from 'd3-selection';
import { JSDOM } from 'jsdom';
import Tooltip from '../../source/js/lib/Tooltip';

describe('Tooltip', () => {
  it('should render a simple tooltip without data', () => {
    let seriesData;
    const dispatchers = { on: () => {} };
    const options = { enabled: true };

    const tooltip = new Tooltip(seriesData, options, dispatchers, 'id');

    tooltip.render();

    const body = '<div class="reflect-charts-tooltip-header"></div><div class="reflect-charts-tooltip-content"></div>';

    expect(select('.reflect-charts-tooltip').html()).to.eql(body);
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

      const dispatchers = { on: dispatchCallback };
      const formatter = (v) => v.toUpperCase();
      const options = { tooltips: { enabled: true, formatter } };

      const tooltip = new Tooltip(seriesData, options, dispatchers, 'id');

      tooltip.render();

      const selection = select('.reflect-charts-tooltip');

      expect(selection.select('.reflect-charts-tooltip-header').text()).to.eql('HELLO');
      expect(selection.select('.reflect-charts-tooltip-value').text()).to.eql('1');
    });
  });
});
