import CSS from '../../helpers/css';
import Series from './Series';
import Area from '../../shapes/Area';

class SeriesArea extends Series {
  constructor(
    data,
    dimensions,
    x,
    y,
    clipPathId,
    options,
    dispatchers,
    yAxisIndex,
  ) {
    super(
      data,
      dimensions,
      x,
      y,
      clipPathId,
      options,
      dispatchers,
      yAxisIndex,
      'series-area',
    );
  }

  render(selection) {
    const { x, y, options, dimensions } = this;
    let series;

    if (!this.selection) {
      this.selection = selection;
    }

    series = selection
      .selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => d.seriesIndex);

    series.exit().remove();

    const newSeries = series.enter().append('g');

    newSeries.append('path').classed(CSS.getClassName('area-path'), true);

    series = newSeries.merge(series);

    series
      .attr(
        'class',
        d =>
          `${CSS.getClassName('series', this.selector)} ${CSS.getColorClassName(
            d.seriesIndex,
          )}`,
      )
      .attr('clip-path', `url(#${this.clipPathId})`);

    const areas = series.selectAll(CSS.getClassSelector('area-path'));

    areas
      .classed(CSS.getClassName('area-path'), true)
      .attr('style', d => (d.color ? `fill: ${d.color};` : null))
      .style('fill-opacity', options.opacity ? options.opacity : null)
      .attr('d', d => Area(x, y, d.data, dimensions, options));

    return series;
  }
}

export default SeriesArea;
