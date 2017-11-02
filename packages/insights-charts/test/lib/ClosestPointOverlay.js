import { expect } from 'chai';
import { select } from 'd3-selection';
import { JSDOM } from 'jsdom';
import ClosestPointOverlay from '../../source/js/lib/ClosestPointOverlay';
import DataSet from '../../source/js/lib/DataSet';

describe('ClosestPointOverlay', () => {
  it('should render a ClosestPointOverlay', () => {
    const dataSet = new DataSet({
      categories: ['a', 'b'],
      series: [
        {
          label: 'Primary',
          data: [1, 2],
        },
      ]
    });

    const overlay = new ClosestPointOverlay(dataSet.getCategories(), null, {}, {});
    overlay.render(global.chart);

    expect(global.chart.select('.reflect-charts-overlay').size()).to.eql(1);
  });
});
