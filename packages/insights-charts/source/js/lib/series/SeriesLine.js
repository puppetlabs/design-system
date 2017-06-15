import CSS from '../../helpers/css';
import Series from './Series';
import Line from '../../shapes/Line';

class SeriesLine extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex) {
    super(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, 'series-line');
  }

  render(selection) {
    const { x, y, options } = this;

    if (!this.selection) {
      this.selection = selection;
    }

    this.series = selection.selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => (d.seriesIndex));

    this.series
      .selectAll(CSS.getClassSelector('line-path'))
        .attr('style', d => (d.color ? `stroke: ${d.color};` : null))
        .attr('d', d => (Line(x, y, d.data, options)));

    this.series.exit().remove();

    this.series = this.series.enter()
      .append('g')
        .attr('class', d => (CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`)))
        .attr('clip-path', `url(#${this.clipPathId})`)
      .append('path')
        .attr('class', CSS.getClassName('line-path'))
        .attr('style', d => (d.color ? `stroke: ${d.color};` : null))
        .attr('d', d => (Line(x, y, d.data, options)))
        .merge(this.series);

    return this.series;
  }
}

export default SeriesLine;
