import { expect } from 'chai';
import sinon from 'sinon';
import clone from 'clone';
import Dispatchers from '../../source/js/lib/Dispatchers';
import Donut from '../../source/js/lib/Donut';
import DataSet from '../../source/js/lib/DataSet';
import CSS from '../../source/js/helpers/css';
import DataGenerator from '../../styleguide/js/helpers';

const DATA_POINTS = 10;
const DATA_COLOR = 'red';

describe('Donut', () => {
  const generator = new DataGenerator();
  generator.setDataConfig({ points: DATA_POINTS });
  generator.setXScaleType('ordinal');

  const randomData = generator.generate();

  const data = new DataSet(randomData);
  const seriesData = data.getSeries();

  seriesData[0].data[0].color = DATA_COLOR;

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

  const dispatchers = new Dispatchers();

  it('should render a donut without blowing up', () => {
    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    expect(global.chart.selectAll(CSS.getClassSelector('donut-arc-wrapper')).size()).to.eql(DATA_POINTS);
  });

  it('should render a single arc inside of a donut wrapper', () => {
    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    const firstWrapper = global.chart.select(CSS.getClassSelector('donut-arc-wrapper'));

    expect(firstWrapper.selectAll(CSS.getClassSelector('donut-arc')).size()).to.eql(1);
  });

  it('should change the color of the arc when the value is set on the data', () => {
    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('donut-arc')).style('fill')).to.eql(DATA_COLOR);
    expect(global.chart.select(CSS.getClassSelector('donut-arc')).style('stroke')).to.eql(DATA_COLOR);
  });

  it('should change the opacity of the arc when the option is provided', () => {
    const newOptions = clone(options);
    newOptions.donut = { opacity: 0.5 };

    const donut = new Donut(seriesData, newOptions, dimensions, dispatchers);
    donut.render(global.chart);

    expect(global.chart.select(CSS.getClassSelector('donut-arc')).style('opacity')).to.eql('0.5');
  });

  it('should fire a data point click event when an arc is clicked an the external event is registered', () => {
    const onClick = sinon.spy();
    dispatchers.on('dataPointClick.external', onClick);

    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    const arc = global.chart.select(CSS.getClassSelector('donut-arc'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    arc.node().dispatchEvent(e);

    expect(onClick.calledOnce).to.equal(true);
  });

  it('should fire a tooltipMove, activatePointOfInterest, and highlightSeries event when moving your mouse over an arc', () => {
    const tooltipMoved = sinon.spy();
    dispatchers.on('tooltipMove', tooltipMoved);
    const activatePointOfInterest = sinon.spy();
    dispatchers.on('activatePointOfInterest', activatePointOfInterest);
    const highlightSeries = sinon.spy();
    // We have to append .test here due to the class absorbing the first call of unHighlightSeries
    dispatchers.on('highlightSeries.test', highlightSeries);

    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    const wrapper = global.chart.select(CSS.getClassSelector('donut-arc-wrapper'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mousemove', true, true);
    wrapper.node().dispatchEvent(e);

    expect(tooltipMoved.calledOnce).to.equal(true);
    expect(activatePointOfInterest.calledOnce).to.equal(true);
    expect(highlightSeries.calledOnce).to.equal(true);
  });

  it('should fire a tooltipHide and unHighlightSeries event when a mouse exits an arc', () => {
    const tooltipHide = sinon.spy();
    dispatchers.on('tooltipHide', tooltipHide);
    const unHighlightSeries = sinon.spy();
    // We have to append .test here due to the class absorbing the first call of unHighlightSeries
    dispatchers.on('unHighlightSeries.test', unHighlightSeries);

    const donut = new Donut(seriesData, options, dimensions, dispatchers);
    donut.render(global.chart);

    const wrapper = global.chart.select(CSS.getClassSelector('donut-arc-wrapper'));

    const e = document.createEvent('MouseEvents');
    e.initEvent('mouseout', true, true);
    wrapper.node().dispatchEvent(e);

    expect(tooltipHide.calledOnce).to.equal(true);
    expect(unHighlightSeries.calledOnce).to.equal(true);
  });
});
