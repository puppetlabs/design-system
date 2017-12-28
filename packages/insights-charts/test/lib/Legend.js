/* eslint-disable no-new */
import { expect } from 'chai';
import Legend from '../../source/js/lib/Legend';
import CSS from '../../source/js/helpers/css';

describe('Legend', () => {
  const margins = {};
  const dispatchers = { on: () => {}, enabled: () => {} };

  it('should render the legend without blowing up', () => {
    const options = { legend: { enabled: true } };
    const seriesData = [{ label: 'blah', data: [{ y: 1 }, { y: 2 }] }];

    const legend = new Legend(seriesData, options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend').size()).to.eql(1);
  });

  it('should set the opacity of a legend indicator to the correct value when supplied as an option', () => {
    const options = { legend: { enabled: true }, type: 'area', area: { opacity: 0.5 } };
    const seriesData = [{ label: 'blah', data: [{ y: 1 }, { y: 2 }] }];

    const legend = new Legend(seriesData, options, margins, dispatchers);
    legend.render(global.chart);

    const indicator = global.chart.select(CSS.getClassSelector('series-indicator'));

    expect(indicator.style('opacity')).to.eql('0.5');
  });

  it('should orient to the bottom of the chart when provided', () => {
    const options = { legend: { enabled: true, orientation: 'bottom' } };

    const legend = new Legend([], options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend-bottom').size()).to.eql(1);
  });

  it('should orient to the left of the chart when provided', () => {
    const options = { legend: { enabled: true, orientation: 'left' } };

    const legend = new Legend([], options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend-left').size()).to.eql(1);
  });

  it('should orient to the top of the chart when provided', () => {
    const options = { legend: { enabled: true, orientation: 'top' } };

    const legend = new Legend([], options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend-top').size()).to.eql(1);
  });

  it('should align the contents to the right of the legend when provided', () => {
    const options = { legend: { enabled: true, alignment: 'right' } };

    const legend = new Legend([], options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend-align-right').size()).to.eql(1);
  });

  it('should align the contents to the center of the legend when provided', () => {
    const options = { legend: { enabled: true, alignment: 'center' } };

    const legend = new Legend([], options, margins, dispatchers);
    legend.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-legend-align-center').size()).to.eql(1);
  });

  context('multi-series', () => {
    const seriesData = [{
      label: 'foo',
      aggregate: 45,
      data: [{ axis: 0, x: 'foo', y: 1 }, { axis: 0, x: 'bar', y: 2 }],
    }, {
      label: 'bar',
      aggregate: 45,
      data: [{ axis: 0, x: 'foo', y: 1 }, { axis: 0, x: 'bar', y: 2 }],
    }];

    it('should render aggregates when chart is multiseries', () => {
      const options = { legend: { enabled: true } };
      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item').text()).to.eql('foo: 45');
    });

    it('should allow us to format the series labels', () => {
      const formatter = (v) => v.toUpperCase();
      const options = { legend: { enabled: true, formatter } };
      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item-value').text()).to.eql('FOO');
    });

    it('should allow us to format aggregate values', () => {
      const formatter = (v) => v * 2;
      const options = {
        legend: { enabled: true },
        axis: { y: [{ values: { formatter } }] },
      };

      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item-aggregate').text()).to.eql(': 90');
    });
  });

  context('single series', () => {
    const seriesData = [{
      data: [{ axis: 0, y: 1, x: 'test1' }, { axis: 0, y: 2, x: 'test2' }],
    }];

    it('should list data points as series', () => {
      const options = { legend: { enabled: true, expanded: true } };

      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item').size()).to.eql(2);
      expect(global.chart.select('.reflect-charts-legend-item').text()).to.eql('test1');
    });

    it('should allow us to format the series labels', () => {
      const formatter = (v) => v.toUpperCase();
      const options = { legend: { enabled: true, expanded: true, formatter } };

      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item-value').text()).to.eql('TEST1');
    });

    it('should allow us to format the aggregate values', () => {
      const formatter = (v) => v*2;
      const options = {
        legend: { enabled: true, expanded: true, aggregates: true },
        axis: { y: [{ values: { formatter } }] },
      };

      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      expect(global.chart.selectAll('.reflect-charts-legend-item-aggregate').text()).to.eql(': 2');
    });
  });

  context('combination chart', () => {
    it('should set the opacity of a legend indicator to the correct value when supplied as an option', () => {
      const options = { legend: { enabled: true }, type: 'combination', area: { opacity: 0.5 } };
      const seriesData = [{ label: 'blah', type: 'area', data: [{ y: 1 }, { y: 2 }] }];

      const legend = new Legend(seriesData, options, margins, dispatchers);
      legend.render(global.chart);

      const indicator = global.chart.select(CSS.getClassSelector('series-indicator'));

      expect(indicator.style('opacity')).to.eql('0.5');
    });
  });
});
