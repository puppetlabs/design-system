import { expect } from 'chai';
import XScale from '../../../source/js/lib/scales/XScale';
import XAxis from '../../../source/js/lib/axis/XAxis';
import DataSet from '../../../source/js/lib/DataSet';
import DataGenerator from '../../../styleguide/js/helpers';

describe('XAxis', () => {
  const generator = new DataGenerator();
  const randomData = generator.generate();
  const data = new DataSet(randomData);
  const categories = data.getCategories().map(c => (c.label));
  const dimensions = { height: 100, margins: { top: 10, bottom: 10, left: 10, right: 10 } };

  const xScale = new XScale(categories, { axis: { x: { orientation: 'bottom' } } }, dimensions);
  const x = xScale.generate();

  it('should render a basic x axis', () => {
    const xAxis = new XAxis(categories, x, dimensions, { axis: { x: { } } });
    xAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-x').size()).to.eql(1);
  });

  it('should render an axis title if its provided', () => {
    const xAxis = new XAxis(categories, x, dimensions, { axis: { x: { title: 'title' } } });
    xAxis.render(global.chart);

    expect(global.chart.selectAll('.reflect-charts-axis-title').size()).to.eql(1);
    expect(global.chart.select('.reflect-charts-axis-title').text()).to.eql('title');
  });

  it('should allow us to rotate the labels', () => {
    const xAxis = new XAxis(categories, x, dimensions, {
      axis: {
        x: {
          title: 'title',
          labels: { rotated: true },
        },
      },
    });
    xAxis.render(global.chart);

    const axis = global.chart.selectAll('.reflect-charts-axis-x');

    expect(axis.select('.tick').select('text').attr('transform')).to.eql('rotate(-45)');
  });

  it('should render all of the categories', () => {
    const cats = ['Colby', 'Geoff'];
    const scale = new XScale(cats, { axis: { x: { orientation: 'bottom' } } }, dimensions)
      .generate();

    const axis = new XAxis(cats, scale, dimensions, {
      axis: {
        x: {
          title: 'title',
          labels: { rotated: true },
        },
      },
    });
    axis.render(global.chart);

    global.chart.selectAll('.reflect-charts-axis-x').selectAll('.tick').select((tick, i) => {
      expect(tick).to.eql(cats[i]);
    });
  });

  describe('when disabled', () => {
    it('should not render anything', () => {
      const xAxis = new XAxis(categories, x, dimensions, { axis: { x: { enabled: false } } });
      const axis = xAxis.render(global.chart);

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-x').empty()).to.eql(true);
    });

    it('should not update', () => {
      const xAxis = new XAxis(categories, x, dimensions, { axis: { x: { enabled: false } } });
      const axis = xAxis.render(global.chart);
      xAxis.update(categories, x, dimensions, { axis: { x: { enabled: false } } });

      expect(axis).to.not.exist;

      expect(global.chart.select('.reflect-charts-axis-x').empty()).to.eql(true);
    });
  });
});
