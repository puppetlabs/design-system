import { event, select } from 'd3-selection';
import classnames from 'classnames';
import { UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';

class Legend {
  constructor(seriesData, options, dimensions, dispatchers) {
    this.seriesData = seriesData;
    this.options = options;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;

    this.getFormattedAggregate = this.getFormattedAggregate.bind(this);
  }

  getFormattedLabel(value) {
    const options = this.options;
    const legendFormatter = options.legend && options.legend.formatter;

    return helpers.getFormattedValue(legendFormatter, value);
  }

  getFormattedAggregate(datum) {
    const options = this.options;
    const yOptions = options.axis && options.axis.y ? options.axis.y[datum.axis] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;

    return helpers.getFormattedValue(optionFormatter, datum.aggregate);
  }

  getLegendValues(seriesData, expanded) {
    let values = [];

    if (expanded) {
      values = seriesData[0].data.map((d, i) => {
        const val = {
          label: this.getFormattedLabel(d.x),
          value: d.x,
          axis: d.axis,
          seriesIndex: i,
          color: d.color,
          type: d.seriesType,
        };

        if (this.options.legend && this.options.legend.aggregates) {
          val.aggregate = d.y;
        }

        return val;
      });
    } else {
      // We need to set the axis for each series.
      values = seriesData.map((s) => {
        const series = {
          data: s.data,
          color: s.color,
          value: s.label,
          aggregate: s.aggregate,
          seriesIndex: s.seriesIndex,
          label: this.getFormattedLabel(s.label),
          type: s.type,
        };

        if (series.data) {
          series.axis = series.data[0].axis;
        }

        return series;
      });
    }

    return values;
  }

  renderIndicator(elements, alignment) {
    const options = this.options;

    elements.append('span')
      .classed(CSS.getClassName('series-indicator'), true)
      .classed(CSS.getClassName('series-indicator-right'), alignment === 'right')
      .style('background', d => (d.color ? d.color : null))
      .style('opacity', d => (helpers.getSeriesIndicatorOpacity(d, options)));
  }

  render(selection) {
    const { seriesData, options, dimensions, dispatchers } = this;
    const legendOptions = options.legend || {};
    const { enabled, orientation, alignment, maxHeight, maxWidth } = legendOptions;
    const margins = dimensions.margins || {};
    let container;
    let legendItems;

    if (enabled !== false) {
      this.selection = selection;

      selection.selectAll(CSS.getClassSelector('legend')).remove();

      container = selection
        .append('div')
        .style('max-height', orientation === 'bottom' || orientation === 'top' ? maxHeight : null)
        .style('max-width', orientation === 'left' || orientation === 'right' ? maxWidth : null)
        .attr('class', classnames(
          CSS.getClassName('legend'),
          CSS.getClassName(`legend-${orientation}`),
          CSS.getClassName(`legend-align-${alignment}`),
        ));

      if (
        (orientation === 'bottom' || orientation === 'top') &&
        alignment !== 'center' &&
        margins.left
      ) {
        container.style('padding-left', `${margins.left}px`);
      }

      if ((orientation === 'right' || orientation === 'left') && margins.top) {
        container.style('padding-top', `${margins.top}px`);
      }

      const data = this.getLegendValues(seriesData, legendOptions.expanded);

      legendItems = container.selectAll(CSS.getClassName('legend-item'))
        .data(data)
        .enter()
        .append('div')
          .attr('class', (d, i) => (
            classnames(CSS.getClassName('legend-item'), CSS.getColorClassName(i), {
              [CSS.getClassName('legend-item-disabled')]: d.disabled,
            })
          ))
          .on('mouseover', (d) => {
            dispatchers.call('highlightSeries', this, d.seriesIndex);
          })
          .on('mouseout', () => {
            dispatchers.call('unHighlightSeries');
          });

      if (dispatchers.enabled('legendItemClick.external')) {
        legendItems
          .style('cursor', 'pointer')
          .on('click', function (d) {
            dispatchers.call('legendItemClick', this, { event, data: d });
          });
      }

      dispatchers.on('update.legend', () => {
        container.selectAll(CSS.getClassSelector('legend-item'))
          .classed(CSS.getClassName('legend-item-disabled'), d => (d.disabled));
      });

      dispatchers.on('highlightSeries.legend', (seriesIndex) => {
        legendItems.each(function (d, i) {
          select(this).style('opacity', (i === seriesIndex) ? null : UNHIGHLIGHTED_OPACITY);
        });
      });

      dispatchers.on('unHighlightSeries.legend', () => {
        legendItems.each(function () {
          select(this).style('opacity', null);
        });
      });

      if (alignment === 'left' || alignment === 'center' || alignment === undefined) {
        this.renderIndicator(legendItems, alignment);
      }

      legendItems.append('span')
        .attr('class', CSS.getClassName('legend-item-value'))
        .text(d => d.label);

      const hasAggregate = data.some(d => d.aggregate !== undefined);

      if (hasAggregate) {
        legendItems.append('span')
          .attr('class', CSS.getClassName('legend-item-aggregate'))
          .text(d => (d.aggregate !== undefined ? `: ${this.getFormattedAggregate(d)}` : null));
      }

      if (alignment === 'right') {
        this.renderIndicator(legendItems, alignment);
      }
    }

    this.container = container;
  }
}

export default Legend;
