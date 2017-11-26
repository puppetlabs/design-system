import { select, event, mouse } from 'd3-selection';
import CSS from '../../helpers/css';
import helpers from '../../helpers/charting';
import Series from './Series';

class SeriesColumn extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, x1) {
    super(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, 'series-column', x1);

    this.getTransform = this.getTransform.bind(this);
    this.getColumnThickness = this.getColumnThickness.bind(this);
    this.getColumnLength = this.getColumnLength.bind(this);
    this.getXPosition = this.getXPosition.bind(this);
    this.getYPosition = this.getYPosition.bind(this);
  }

  isBar() {
    const orientation = this.options.axis.x.orientation;

    return orientation === 'left' || orientation === 'right';
  }

  isStacked() {
    return this.options.layout === 'stacked';
  }

  isGrouped() {
    return this.options.layout === 'grouped';
  }

  getTransform(d) {
    const x = this.x;
    let result;

    if (this.isGrouped() && !this.isBar()) {
      result = `translate(${x(d.x)},0)`;
    } else if (this.isGrouped() && this.isBar()) {
      result = `translate(0, ${x(d.x)})`;
    }

    return result;
  }

  getColumnThickness() {
    const { x, x1 } = this;

    return this.isGrouped() ? x1.bandwidth() : x.bandwidth();
  }

  getColumnLength(d) {
    const { y, options } = this;

    return helpers.getColumnLength(options, y, d, this.yAxisIndex);
  }

  getXPosition(d) {
    const { x, x1 } = this;
    let val;

    if (this.isGrouped()) {
      val = x1(d.seriesLabel);
    } else {
      val = x(d.x);
    }

    return val;
  }

  getYPosition(d) {
    return helpers.getYPosition(this.options, this.y, d, this.yAxisIndex);
  }

  render(selection) {
    const { dispatchers } = this;

    if (!this.selection) {
      this.selection = selection;
    }

    let series = selection.selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => (d.seriesIndex));

    series.exit().remove();

    series = series.enter()
      .append('g')
      .merge(series)
        .attr('class', d =>
          (`${CSS.getClassName('series', this.selector)} ${CSS.getColorClassName(d.seriesIndex)}`))
        .attr('clip-path', `url(#${this.clipPathId})`);

    // updating bars that were already in the view
    let rect = series.selectAll(CSS.getClassSelector('column-rect'))
      .data(d => d.data);

    // adding new bars and merging the ones that will be updated
    rect = rect.enter()
        .append('svg:rect')
        .merge(rect);

    rect.attr('transform', this.getTransform)
        .attr('x', this.isBar() ? this.getYPosition : this.getXPosition)
        .attr('y', this.isBar() ? this.getXPosition : this.getYPosition)
        .attr('width', this.isBar() ? this.getColumnLength : this.getColumnThickness)
        .attr('style', d => (d.color ? `fill: ${d.color};` : null))
        .attr('height', this.isBar() ? this.getColumnThickness : this.getColumnLength)
        .on('mousemove', function (d) {
          const dims = mouse(select('body').node());

          dispatchers.call('tooltipMove', this, d.categoryIndex, d.seriesIndex, d.x, dims);
          dispatchers.call('activatePointOfInterest', this, d.x);
        })
        .on('mouseover', function (d) {
          const index = d.seriesIndex;
          const dims = mouse(select('body').node());

          dispatchers.call('tooltipMove', this, d.categoryIndex, d.seriesIndex, d.x, dims);
          dispatchers.call('highlightSeries', this, index);
        })
        .on('mouseout', () => {
          dispatchers.call('tooltipHide');
          dispatchers.call('unHighlightSeries');
        })
        .attr('class', CSS.getClassName('column-rect'));

    if (dispatchers.enabled('dataPointClick.external')) {
      rect.style('cursor', 'pointer')
        .on('click', (point) => {
          dispatchers.call('dataPointClick', this, { event, data: { point } });
        });
    }

    return series;
  }
}

export default SeriesColumn;
