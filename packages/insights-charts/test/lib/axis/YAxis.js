import { expect } from 'chai';
import YScale from '../../../source/js/lib/scales/YScale';
import YAxis from '../../../source/js/lib/axis/YAxis';
import DataSet from '../../../source/js/lib/DataSet';
import DataGenerator from '../../../styleguide/js/helpers';

describe('YAxis', () => {
  const generator = new DataGenerator();
  const randomData = generator.generate();
  const data = new DataSet(randomData);
  const seriesData = data.getSeries();

  const dimensions = {
    width: 100,
    height: 100,
    margins: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  const yScale = new YScale(seriesData, {}, 'normal', dimensions);
  const y = yScale.generate();

  it('should render a basic y axis', () => {
    const yAxis = new YAxis(y, dimensions, {});
    yAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-y').size()).to.eql(1);
  });

  it('should render an axis title if its provided', () => {
    const yAxis = new YAxis(y, dimensions, { title: 'title' });
    yAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-title').size()).to.eql(1);
    expect(global.chart.select('.reflect-charts-axis-title').text()).to.eql('title');
  });

  it('should render an axis in the correct location if no orientation is provided', () => {
    const yAxis = new YAxis(y, dimensions, {});
    yAxis.render(global.chart);

    expect(global.chart.select('.reflect-charts-axis-y').attr('transform')).to.eql('translate(0, 0)');
  });

  it('should render an axis in the correct location if orientation is set to right', () => {
    const yAxis = new YAxis(y, dimensions, { orientation: 'right' });
    yAxis.render(global.chart);

    expect(global.chart.select('.reflect-charts-axis-y').attr('transform')).to.eql(`translate(${dimensions.width}, 0)`);
  });

  describe('when disabled', () => {
    it('should not render anything', () => {
      const yAxis = new YAxis(y, dimensions, { enabled: false });
      const axis = yAxis.render(global.chart);

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-y').empty()).to.eql(true);
    });

    it('should not update', () => {
      const yAxis = new YAxis(y, dimensions, { enabled: false });
      const axis = yAxis.render(global.chart);
      yAxis.update(y, dimensions, { enabled: false });

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-y').empty()).to.eql(true);
    });
  });
});
