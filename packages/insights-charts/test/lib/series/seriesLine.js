import { expect } from 'chai';
import clone from 'clone';
import XScale from '../../../source/js/lib/scales/XScale';
import YScale from '../../../source/js/lib/scales/YScale';
import Dispatchers from '../../../source/js/lib/Dispatchers';
import SeriesLine from '../../../source/js/lib/series/SeriesLine';
import DataSet from '../../../source/js/lib/DataSet';
import CSS from '../../../source/js/helpers/css';
import DataGenerator from '../../../styleguide/js/helpers';

const COLUMN_COUNT = 10;
const COLUMN_COLOR = 'red';

describe('SeriesLine', () => {
  const generator = new DataGenerator();
  generator.setDataConfig({ points: COLUMN_COUNT });
  generator.setXScaleType('ordinal');

  const randomData = generator.generate();
  randomData.series[0].color = COLUMN_COLOR;

  const data = new DataSet(randomData);
  const seriesData = data.getSeries();

  const dimensions = {
    height: 100,
    width: 100,
    margins: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  const options = {};

  const xScale = new XScale(data.getCategories(), options, dimensions);
  const x = xScale.generate();

  const yScale = new YScale(data, options, 'normal', dimensions, {});
  const y = yScale.generate();

  const dispatchers = new Dispatchers();
  const yAxisIndex = 0;

  it('should render a line series without blowing up', () => {
    const series = new SeriesLine(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector('series')).size()).to.eql(1);
  });

  it('should render an line series for the correct y axis', () => {
    const series = new SeriesLine(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector(`series-line-axis-y-${yAxisIndex}`)).size()).to.eql(1);
  });

  it('should render a single line path inside of a line series', () => {
    const series = new SeriesLine(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    const firstSeries = global.chart.select(CSS.getClassSelector('series'));

    expect(firstSeries.selectAll(CSS.getClassSelector('line-path')).size()).to.eql(1);
  });

  it('should change the color of the line when the value is set on the data', () => {
    const series = new SeriesLine(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('line-path')).style('stroke')).to.eql(COLUMN_COLOR);
  });

  it('should change the stroke width of the line when the option is provided', () => {
    const newOptions = clone(options);
    newOptions.line = { stroke: { width: 1 } };

    const series = new SeriesLine(seriesData, dimensions, x, y, 'test', newOptions, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('line-path')).style('stroke-width')).to.eql('1');
  });
});
