/* eslint-disable no-new */
// TODO: We should introduce a generate method instead of using the constructor.

import { expect } from 'chai';
import Legend from '../../source/js/lib/Legend';

describe('Legend', () => {
  const margins = {};
  const dispatchers = { on: () => {}, enabled: () => {} };

  it('should properly render the legend', () => {
    const options = { legend: { enabled: true } };
    const seriesData = [{ label: 'blah', data: [{ y: 1 }, { y: 2 }] }];

    new Legend(global.chart, seriesData, options, margins, dispatchers).render();

    expect(global.chart.selectAll('.reflect-charts-legend').size()).to.eql(1);
  });

  context('multi-series', () => {
    const seriesData = [{
      label: 'foo',
      aggregate: 45,
      data: [{ axis: 0, x: 'foo', y: 1 }, { axis: 0, x: 'bar', y: 2 }],
    }, {
      label: 'bar',
      aggregate: 45,
      data: [{ axis: 0, x: 'foo', y: 1 }, { axis: 0, x: 'bar', y: 2 }],
    }];

    it('should render aggregates when chart is multiseries', () => {
      const options = { legend: { enabled: true } };
      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('foo: 45');
    });

    it('should allow us to format the series labels', () => {
      const formatter = (v) => v.toUpperCase();
      const options = { legend: { enabled: true, formatter } };

      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('FOO: 45');
    });

    it('should allow us to format aggregate values', () => {
      const formatter = (v) => v*2;
      const options = {
        legend: { enabled: true },
        axis: { y: [{ values: { formatter } }] },
      };

      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('foo: 90');
    });
  });

  context('single series', () => {
    const seriesData = [{
      data: [{ axis: 0, y: 1, x: 'test1' }, { axis: 0, y: 2, x: 'test2' }],
    }];

    it('should list data points as series', () => {
      const options = { legend: { enabled: true, expanded: true } };

      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').size()).to.eql(2);
      expect(global.chart.select('.reflect-charts-legend-item').text()).to.eql('test1');
    });

    it('should allow us to format the series labels', () => {
      const formatter = (v) => v.toUpperCase();
      const options = { legend: { enabled: true, expanded: true, formatter } };

      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('TEST1');
    });

    it('should allow us to format the aggregate values', () => {
      const formatter = (v) => v*2;
      const options = {
        legend: { enabled: true, expanded: true, aggregates: true },
        axis: { y: [{ values: { formatter } }] },
      };

      new Legend(global.chart, seriesData, options, margins, dispatchers).render();

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('test1: 2');
    });
  });
});
