import CSS from '../../helpers/css';
import Series from './Series';
import Line from '../../shapes/Line';

class SeriesLine extends Series {
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
      'series-line',
    );
  }

  isDisabled() {
    const options = this.options || {};
    const lineOptions = options.line || {};

    return lineOptions.enabled === false;
  }

  render(selection) {
    const { x, y, options } = this;
    const lineOptions = options.line || {};
    let series;

    if (!this.isDisabled()) {
      if (!this.selection) {
        this.selection = selection;
      }

      series = selection
        .selectAll(CSS.getClassSelector(this.selector))
        .data(this.data, d => d.seriesIndex);

      series.exit().remove();

      const newSeries = series.enter().append('g');

      newSeries.append('path').classed(CSS.getClassName('line-path'), true);

      series = newSeries.merge(series);

      series
        .attr(
          'class',
          d =>
            `${CSS.getClassName(
              'series',
              this.selector,
            )} ${CSS.getColorClassName(d.seriesIndex)}`,
        )
        .attr('clip-path', `url(#${this.clipPathId})`);

      const lines = series.selectAll(CSS.getClassSelector('line-path'));

      lines
        .classed(CSS.getClassName('line-path'), true)
        .attr('d', d => Line(x, y, d.data, options))
        .style('stroke', d => (d.color ? d.color : null))
        .style(
          'stroke-width',
          lineOptions.stroke ? lineOptions.stroke.width : null,
        );
    }

    return series;
  }
}

export default SeriesLine;
