import { expect } from 'chai';
import YScale from '../../../source/js/lib/scales/YScale';
import DataSet from '../../../source/js/lib/DataSet';
import DataGenerator from '../../../styleguide/js/helpers';

describe('YScale', () => {
  const generator = new DataGenerator();

  const dimensions = { height: 100, margins: { top: 10, bottom: 10, left: 10, right: 10 } };

  describe('normal layout', () => {
    const randomData = generator.generate();
    const data = new DataSet(randomData);
    const seriesData = data.getSeries();

    it('should create a range based off the dimensions provided', () => {
      const yScale = new YScale(seriesData, {}, 'normal', dimensions);
      const y = yScale.generate();

      expect(y.range()[0]).to.eql(dimensions.height);
      expect(y.range()[1]).to.eql(0);
    });

    it('should create a domain with the correct min and max values', () => {
      const yScale = new YScale(seriesData, {}, 'normal', dimensions);
      const y = yScale.generate();

      expect(y.domain()[0]).to.eql(Math.min(...randomData.series[0].data) * 0.95);
      expect(y.domain()[1]).to.eql(Math.max(...randomData.series[0].data));
    });

    it('should create a domain with the min value of 0 when the options is provided', () => {
      const yScale = new YScale(seriesData, { min: 0 }, 'normal', dimensions);
      const y = yScale.generate();

      expect(y.domain()[0]).to.eql(0);
    });

    it('should create a domain with the max value of 1000 when the options is provided', () => {
      const yScale = new YScale(seriesData, { max: 1000 }, 'normal', dimensions);
      const y = yScale.generate();

      expect(y.domain()[1]).to.eql(1000);
    });
  });

  describe('stacked layout', () => {
    generator.setSeriesCount(2);
    const randomData = generator.generate();
    const data = new DataSet(randomData);
    const seriesData = data.getSeries();

    it('should create a domain with the min value of 0 when stacking is enabled and the min is greater than 0', () => {
      const yScale = new YScale(seriesData, {}, 'stacked', dimensions);
      const y = yScale.generate();

      expect(y.domain()[0]).to.eql(0);
    });

    it('should create a domain with the max value of all the series', () => {
      const yScale = new YScale(seriesData, {}, 'stacked', dimensions);
      const y = yScale.generate();

      const stackedMax = {};

      randomData.series.forEach((s) => {
        s.data.forEach((d, i) => {
          if (stackedMax[i] === undefined) {
            stackedMax[i] = 0;
          }

          stackedMax[i] += d;
        });
      });

      const maxValues = Object.keys(stackedMax).map(key => (stackedMax[key]));

      expect(y.domain()[1]).to.eql(Math.max(...maxValues));
    });
  });
});
