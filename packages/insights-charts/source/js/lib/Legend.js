import { select } from 'd3-selection';
import classnames from 'classnames';
import { UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';

class Legend {
  constructor(elem, seriesData, options, margins, dispatchers) {
    this.elem = elem;
    this.seriesData = seriesData;
    this.options = options;
    this.margins = margins;
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

  render() {
    const { elem, seriesData, options, margins, dispatchers } = this;
    const { enabled, orientation } = options.legend;
    let container;
    let legendItems;

    if (enabled) {
      elem.selectAll(CSS.getClassSelector('legend')).remove();

      container = elem
        .append('div')
        .attr('class', classnames(
          CSS.getClassName('legend'),
          CSS.getClassName(`legend-${orientation}`),
        ));

      if (orientation === 'top' && margins.top) {
        container.style('top', `${margins.top}px`);
      }

      if (orientation === 'bottom' && margins.left) {
        container.style('padding-left', `${margins.left}px`);
      }

      if (margins.bottom) {
        container.style('bottom', `${margins.bottom}px`);
      }

      if (margins.right) {
        container.style('padding-right', `${margins.right}px`);
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
          .on('click', function (d) {
            dispatchers.call('legendItemClick', this, d);
          });
      }

      dispatchers.on('update.legend', () => {
        container.selectAll(CSS.getClassSelector('legend-item'))
          .classed(CSS.getClassName('legend-item-disabled'), d => (d.disabled));
      });

      dispatchers.on('highlightSeries.legend', (seriesIndex) => {
        legendItems.each(function (d, i) {
          select(this).attr('style', (i === seriesIndex) ? null : `opacity: ${UNHIGHLIGHTED_OPACITY}`);
        });
      });

      dispatchers.on('unHighlightSeries.legend', () => {
        legendItems.each(function () {
          select(this).attr('style', null);
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
