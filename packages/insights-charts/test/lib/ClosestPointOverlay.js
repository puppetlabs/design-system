import { expect } from 'chai';
import { select } from 'd3-selection';
import { JSDOM } from 'jsdom';
import ClosestPointOverlay from '../../source/js/lib/ClosestPointOverlay';

describe('ClosestPointOverlay', () => {
  it('should render a ClosestPointOverlay', () => {
    const categories = ['a', 'b'];

    const overlay = new ClosestPointOverlay(categories, null, {}, {});
    overlay.render(global.chart);

    expect(global.chart.select('.reflect-charts-overlay').size()).to.eql(1);
  });
});
