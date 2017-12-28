import { expect } from 'chai';
import clone from 'clone';
import sinon from 'sinon';
import XScale from '../../../source/js/lib/scales/XScale';
import YScale from '../../../source/js/lib/scales/YScale';
import Dispatchers from '../../../source/js/lib/Dispatchers';
import SeriesColumn from '../../../source/js/lib/series/SeriesColumn';
import DataSet from '../../../source/js/lib/DataSet';
import CSS from '../../../source/js/helpers/css';
import DataGenerator from '../../../styleguide/js/helpers';

const COLUMN_COUNT = 10;
const COLUMN_COLOR = 'red';

describe('SeriesColumn', () => {
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

  it('should render a column series without blowing up', () => {
    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector('series')).size()).to.eql(1);
  });

  it('should render a column series for the correct y axis', () => {
    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector(`series-column-axis-y-${yAxisIndex}`)).size()).to.eql(1);
  });

  it('should render the correct number of columns', () => {
    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector('column-rect')).size()).to.eql(COLUMN_COUNT);
  });

  it('should change the color of the columns when the value is set on the data', () => {
    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('column-rect')).style('fill')).to.eql(COLUMN_COLOR);
  });

  it('should change the fill opacity of the columns when the option is provided', () => {
    const newOptions = clone(options);
    newOptions.opacity = 0.5;

    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', newOptions, dispatchers, yAxisIndex);
    series.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('column-rect')).style('fill-opacity')).to.eql('0.5');
  });

  it('should fire a data point click event when a column is clicked an the external event is registered', () => {
    const onClick = sinon.spy();
    dispatchers.on('dataPointClick.external', onClick);

    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    const column = global.chart.select(CSS.getClassSelector('column-rect'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mousedown', true, true);
    column.node().dispatchEvent(e);

    expect(onClick.calledOnce).to.equal(true);
  });

  it('should fire a tooltipMove and activatePointOfInterest event when moving your mouse over a column', () => {
    const tooltipMoved = sinon.spy();
    dispatchers.on('tooltipMove', tooltipMoved);
    const activatePointOfInterest = sinon.spy();
    dispatchers.on('activatePointOfInterest', activatePointOfInterest);

    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    const column = global.chart.select(CSS.getClassSelector('column-rect'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mousemove', true, true);
    column.node().dispatchEvent(e);

    expect(tooltipMoved.calledOnce).to.equal(true);
    expect(activatePointOfInterest.calledOnce).to.equal(true);
  });

  it('should fire a tooltipMove and highlightSeries event when a mouse enters a column', () => {
    const tooltipMoved = sinon.spy();
    dispatchers.on('tooltipMove', tooltipMoved);
    const highlightSeries = sinon.spy();
    dispatchers.on('highlightSeries', highlightSeries);

    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    const column = global.chart.select(CSS.getClassSelector('column-rect'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mouseover', true, true);
    column.node().dispatchEvent(e);

    expect(tooltipMoved.calledOnce).to.equal(true);
    expect(highlightSeries.calledOnce).to.equal(true);
  });

  it('should fire a tooltipHide and unHighlightSeries event when a mouse exits a column', () => {
    const tooltipHide = sinon.spy();
    dispatchers.on('tooltipHide', tooltipHide);
    const unHighlightSeries = sinon.spy();
    dispatchers.on('unHighlightSeries', unHighlightSeries);

    const series = new SeriesColumn(seriesData, dimensions, x, y, 'test', options, dispatchers, yAxisIndex);
    series.render(global.chart);

    const column = global.chart.select(CSS.getClassSelector('column-rect'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mouseout', true, true);
    column.node().dispatchEvent(e);

    expect(tooltipHide.calledOnce).to.equal(true);
    expect(unHighlightSeries.calledOnce).to.equal(true);
  });
});
