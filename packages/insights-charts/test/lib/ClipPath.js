/* eslint-disable no-new */
import { expect } from 'chai';
import ClipPath from '../../source/js/lib/ClipPath';

describe('ClipPath', () => {
  const dimensions = { width: 600, height: 200 };
  const options = { animations: { enabled: true, duration: 0 } };

  it('should properly render the clipPath', () => {
    const clipPath = new ClipPath(dimensions, {}, 1);

    clipPath.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-clip-path-rect').size()).to.eql(1);
  });

  describe('horizontal orientation (default)', () => {
    it('should properly set the width of the clipPath on render', () => {
      const clipPath = new ClipPath(dimensions, {}, 1);

      clipPath.render(global.chart);

      expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('0');
      expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('200');
    });

    it('should properly set the width of the clipPath on animate', (done) => {
      const clipPath = new ClipPath(dimensions, options, 1);

      clipPath.render(global.chart);

      clipPath.animate(function() {
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('600');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('200');

        done();
      });
    });

    it('should properly set the width of the clipPath on animate when animations are disabled', (done) => {
      const clipPath = new ClipPath(dimensions, { animations: { enabled: false } }, 1);

      clipPath.render(global.chart);

      clipPath.animate(function() {
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('600');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('200');

        done();
      });
    });
  });

  describe('vertical orientation', () => {
    it('should properly set the height of the clipPath on render', () => {
      const clipPath = new ClipPath(dimensions, options, 1, 'vertical');

      clipPath.render(global.chart);

      expect(global.chart.select('.reflect-charts-clip-path-rect').attr('y')).to.eql('200');
      expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('600');
      expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('0');
    });

    it('should properly set the height of the clipPath on animate', (done) => {
      const clipPath = new ClipPath(dimensions, options, 1, 'vertical');

      clipPath.render(global.chart);

      clipPath.animate(function() {
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('y')).to.eql('0');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('600');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('200');

        done();
      });
    });

    it('should properly set the height of the clipPath on animate when animations are disabled', (done) => {
      const clipPath = new ClipPath(dimensions, { animations: { enabled: false } }, 1);

      clipPath.render(global.chart);

      clipPath.animate(function() {
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('y')).to.eql('0');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('width')).to.eql('600');
        expect(global.chart.select('.reflect-charts-clip-path-rect').attr('height')).to.eql('200');

        done();
      });
    });
  });
});
