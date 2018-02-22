import { expect } from 'chai';
import { select } from 'd3-selection';
import YScale from '../../../source/js/lib/scales/YScale';
import YAxis from '../../../source/js/lib/axis/YAxis';
import DataSet from '../../../source/js/lib/DataSet';

describe('YAxis', () => {
  const simpleData = { categories: [0, 1, 2, 3, 4, 5], series: [{ title: 'series 1', data: [0, 1, 2, 3, 4, 5] }] };
  const data = new DataSet(simpleData);
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

  it('should render an axis with the integer formatting on integer datasets', () => {
    const yAxis = new YAxis(y, dimensions, {});
    yAxis.render(global.chart);

    expect(global.chart.select('.reflect-charts-axis-y').selectAll('.tick').size()).to.eql(6);
  });

  it('should render an axis with decimal formatting on decimal datasets', () => {
    const decimalData = { categories: [0, 1, 2, 3, 4, 5], series: [{ title: 'series 1', data: [0, 0.5, 0.1, 1.5, 2, 2.5] }] };
    const decimalDataSet = new DataSet(decimalData);
    const newData = decimalDataSet.getSeries();
    const newYScale = new YScale(newData, {}, 'normal', dimensions);
    const newY = newYScale.generate();

    const yAxis = new YAxis(newY, dimensions, {});
    yAxis.render(global.chart);

    let correctTicks = 1;

    global.chart.select('.reflect-charts-axis-y').selectAll('.tick').each((tick, i) => {
      if (tick === decimalData.series[0].data[i]) {
        correctTicks += 1;
      }
    });

    expect(correctTicks).to.eql(decimalData.series[0].data.length);
  });

  it('should render an axis with summary formatting on large datasets', () => {
    const decimalData = { categories: [0, 1, 2, 3, 4, 5], series: [{ title: 'series 1', data: [0, 1000000, 2000000, 3000000, 4000000, 5000000] }] };
    const decimalDataSet = new DataSet(decimalData);
    const newData = decimalDataSet.getSeries();
    const newYScale = new YScale(newData, {}, 'normal', dimensions);
    const newY = newYScale.generate();

    const yAxis = new YAxis(newY, dimensions, {});
    yAxis.render(global.chart);

    let correctTicks = 0;

    global.chart.select('.reflect-charts-axis-y').selectAll('.tick').each((tick, i, ticks) => {
      const tickText = select(ticks[i]).text();

      if (i === 0 && tickText === '0') {
        correctTicks += 1;
      } else if (tickText === `${i}M`) {
        correctTicks += 1;
      }
    });

    expect(correctTicks).to.eql(decimalData.series[0].data.length);
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
