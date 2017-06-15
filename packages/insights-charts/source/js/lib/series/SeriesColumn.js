import { mouse } from 'd3-selection';
import CSS from '../../helpers/css';
import Series from './Series';

class SeriesColumn extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, x1) {
    super(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, 'series-column', x1);

    this.getTransform = this.getTransform.bind(this);
    this.getColumnWidth = this.getColumnWidth.bind(this);
    this.getColumnHeight = this.getColumnHeight.bind(this);
    this.getXPosition = this.getXPosition.bind(this);
    this.getYPosition = this.getYPosition.bind(this);
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

    if (this.isGrouped()) {
      result = `translate(${x(d.x)},0)`;
    }

    return result;
  }

  getColumnWidth() {
    const { x, x1 } = this;

    return this.isGrouped() ? x1.bandwidth() : x.bandwidth();
  }

  getColumnHeight(d) {
    const { y, dimensions } = this;
    const height = dimensions.height;
    let val;

    if (this.isStacked()) {
      val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : y(d.y0) - y(d.y0 + d.y);
    } else {
      val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : height - y(d.y);
    }

    return val;
  }

  getXPosition(d) {
    const { x, x1 } = this;
    let val = x(d.x);

    if (this.isGrouped()) {
      val = x1(d.seriesLabel);
    }

    return val;
  }

  getYPosition(d) {
    const y = this.y;
    let yPos;

    if (this.isStacked()) {
      if (d.y < 0 && d.y0 < 0) {
        yPos = y(d.y0);
      } else if (d.y < 0 && d.y0 >= 0) {
        yPos = y(0);
      } else {
        yPos = y(d.y0 + d.y);
      }
    } else {
      yPos = d.y < 0 ? y(0) : y(d.y);
    }

    return yPos;
  }

  render(selection) {
    const { x, dispatchers } = this;

    if (!this.selection) {
      this.selection = selection;
    }

    const getMouseDimensions = (dims, d) => {
      // If we're grouping, we need to account for the translate.
      if (this.isGrouped()) {
        dims[0] += x(d.x);
      }

      return dims;
    };

    this.series = selection.selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => (d.seriesIndex));

    this.series.selectAll(CSS.getClassSelector('column-rect'))
      .attr('transform', this.getTransform)
      .attr('x', this.getXPosition)
      .attr('y', this.getYPosition)
      .attr('width', this.getColumnWidth)
      .attr('style', d => (d.seriesColor ? `fill: ${d.seriesColor};` : null))
      .attr('height', this.getColumnHeight);

    this.series.exit().remove();

    this.series = this.series.enter()
      .append('g')
        .attr('class', d => (CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`)))
        .attr('clip-path', `url(#${this.clipPathId})`)
      .selectAll(CSS.getClassSelector('column-rect'))
        .data(d => d.data)
        .enter()
      .append('svg:rect')
        .attr('transform', this.getTransform)
        .attr('x', this.getXPosition)
        .attr('y', this.getYPosition)
        .attr('width', this.getColumnWidth)
        .attr('style', d => (d.seriesColor ? `fill: ${d.seriesColor};` : null))
        .attr('height', this.getColumnHeight)
        .on('mousemove', function (d, i) {
          const dims = mouse(this);

          dispatchers.call('tooltipMove', this, i, d.x, getMouseDimensions(dims, d));
          dispatchers.call('activatePointOfInterest', this, d.x);
        })
        .on('mouseover', function (d, i) {
          const index = d.seriesIndex;
          const dims = mouse(this);

          dispatchers.call('tooltipMove', this, i, d.x, getMouseDimensions(dims, d));
          dispatchers.call('highlightSeries', this, index);
        })
        .on('mouseout', () => {
          dispatchers.call('tooltipHide');
          dispatchers.call('unHighlightSeries');
        })
        .attr('class', CSS.getClassName('column-rect'))
      .merge(this.series);

    return this.series;
  }
}

export default SeriesColumn;
