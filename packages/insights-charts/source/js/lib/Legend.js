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
        };

        if (series.data) {
          series.axis = series.data[0].axis;
        }

        return series;
      });
    }

    return values;
  }

  render(selection) {
    const { seriesData, options, dimensions, dispatchers } = this;
    const { enabled, orientation, maxHeight, maxWidth } = options.legend;
    const margins = dimensions.margins;
    let container;
    let legendItems;

    if (enabled) {
      this.selection = selection;

      selection.selectAll(CSS.getClassSelector('legend')).remove();

      container = selection
        .append('div')
        .style('max-height', orientation === 'bottom' || orientation === 'top' ? maxHeight : null)
        .style('max-width', orientation === 'left' || orientation === 'right' ? maxWidth : null)
        .attr('class', classnames(
          CSS.getClassName('legend'),
          CSS.getClassName(`legend-${orientation}`),
        ));

      if (orientation === 'bottom' && margins.left) {
        container.style('padding-left', `${margins.left}px`);
      }

      if (orientation === 'right' && margins.top) {
        container.style('padding-top', `${margins.top}px`);
      }

      const data = this.getLegendValues(seriesData, options.legend.expanded);

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

      legendItems.append('span')
        .attr('class', CSS.getClassName('series-indicator'))
        .attr('style', d => (d.color ? `background: ${d.color};` : null));

      legendItems.append('span')
        .text(d => (d.aggregate ? `${d.label}: ${this.getFormattedAggregate(d)}` : d.label));
    }

    this.container = container;
  }
}

export default Legend;
