import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { select } from 'd3-selection';
import Tooltip from '../../source/js/lib/Tooltip';
import CSS from '../../source/js/helpers/css';

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
    const dispatchCallback = (eventName, cb) => {
      if (eventName === 'tooltipMove') {
        cb(0, 0, 'hello', [30, 30]);
      }
    };

    const dispatchers = { on: dispatchCallback };

    it('should properly render the tooltip for a single series chart', () => {
      const seriesData = [{
        data: [{ y: 1, categoryIndex: 0 }, { y: 2, categoryIndex: 1 }],
        seriesIndex: 0,
        label: 'My series',
      }];

      const formatter = v => v.toUpperCase();
      const options = { tooltips: { enabled: true, formatter } };

      const tooltip = new Tooltip(seriesData, options, dispatchers, 'id');

      tooltip.render();

      const selection = select('.reflect-charts-tooltip');

      expect(selection.select('.reflect-charts-tooltip-header').text()).to.eql('HELLO');
      expect(selection.select('.reflect-charts-tooltip-value').text()).to.eql('1');
    });

    it('should set the opacity of a series indicator to the correct value when supplied as an option', () => {
      const options = { type: 'area', area: { opacity: 0.5 } };
      const seriesData = [
        { label: 'foo', data: [{ categoryIndex: 0, y: 1 }, { categoryIndex: 1, y: 2 }] },
        { label: 'bar', data: [{ categoryIndex: 0, y: 1 }, { categoryIndex: 1, y: 2 }] },
      ];

      const tooltip = new Tooltip(seriesData, options, dispatchers, 'id');
      tooltip.render();

      const indicator = select(CSS.getClassSelector('series-indicator'));

      expect(indicator.style('opacity')).to.eql('0.5');
    });
  });
});
