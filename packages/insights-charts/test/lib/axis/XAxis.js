import { expect } from 'chai';
import XScale from '../../../source/js/lib/scales/XScale';
import XAxis from '../../../source/js/lib/axis/XAxis';
import DataSet from '../../../source/js/lib/DataSet';
import DataGenerator from '../../../styleguide/js/helpers';

describe('XAxis', () => {
  const generator = new DataGenerator();
  const randomData = generator.generate();
  const data = new DataSet(randomData);
  const seriesData = data.getSeries();
  const categories = data.getCategories();
  const dimensions = { height: 100, margins: { top: 10, bottom: 10, left: 10, right: 10 } };

  const xScale = new XScale(seriesData, {}, 'normal', dimensions);
  const x = xScale.generate();

  it('should render a basic y axis', () => {
    const xAxis = new XAxis(categories, x, dimensions, {});
    xAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-x').size()).to.eql(1);
  });

  it('should render an axis title if its provided', () => {
    const xAxis = new XAxis(categories, x, dimensions, { title: 'title' });
    xAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-title').size()).to.eql(1);
    expect(global.chart.select('.reflect-charts-axis-title').text()).to.eql('title');
  });

  describe('when disabled', () => {
    it('should not render anything', () => {
      const xAxis = new XAxis(categories, x, dimensions, { enabled: false });
      const axis = xAxis.render(global.chart);

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-x').empty()).to.eql(true);
    });

    it('should not update', () => {
      const xAxis = new XAxis(categories, x, dimensions, { enabled: false });
      const axis = xAxis.render(global.chart);
      xAxis.update(x, dimensions, { enabled: false });

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-x').empty()).to.eql(true);
    });
  });
});
