import CSS from '../../helpers/css';
import Series from './Series';
import Area from '../../shapes/Area';

class SeriesArea extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex) {
    super(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, 'series-area');
  }

  render(selection) {
    const { x, y, options, dimensions } = this;

    if (!this.selection) {
      this.selection = selection;
    }

    this.series = selection.selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => (d.seriesIndex));

    this.series.selectAll(CSS.getClassSelector('area-path'))
      .attr('style', d => (d.color ? `fill: ${d.color};` : null))
      .attr('d', d => (Area(x, y, d.data, dimensions, options)));

    this.series.exit().remove();

    this.series = this.series.enter()
      .append('g')
        .attr('class', d =>
          (`${CSS.getClassName('series', this.selector)} ${CSS.getColorClassName(d.seriesIndex)}`))
        .attr('clip-path', `url(#${this.clipPathId})`)
      .append('path')
        .attr('style', d => (d.color ? `fill: ${d.color};` : null))
        .attr('class', CSS.getClassName('area-path'))
        .attr('d', d => (Area(x, y, d.data, dimensions, options)))
      .merge(this.series);

    return this.series;
  }
}

export default SeriesArea;
