import { select } from 'd3-selection';
import classnames from 'classnames';
import { TOOLTIP_POINTER_MARGIN, UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';
import formatters from '../helpers/formatters';

const TOOLTIP_VERTICAL_PADDING = 5;
const TOOLTIP_CONTAINER_OVERFLOW = 300;

class Tooltip {
  constructor(seriesData, dimensions, options, dispatchers) {
    this.seriesData = seriesData;
    this.options = options;
    this.tooltipOptions = options.tooltip || {};
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;
  }

  getLegendValues(expanded, seriesData) {
    let values = [];

    if (expanded) {
      values = seriesData[0].data.map(d => ({ label: d.x, value: d.y }));
    } else {
      values = seriesData;
    }

    return values;
  }

  getSeriesValue(d, categoryIndex) {
    let value;

    if (typeof d.value !== 'undefined') {
      value = d.value;
    } else {
      return d.data[categoryIndex].y;
    }

    return value;
  }

  getFormattedHeader(category) {
    const options = this.options;
    const xOptions = options.axis && options.axis.x ? options.axis.x : {};
    const optionFormatter = xOptions.values && xOptions.values.formatter;
    let formatter = d => (d);

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    return formatter(category);
  }

  getFormattedItem(datum, group) {
    const options = this.options;
    const yOptions = options.axis && options.axis.y ? options.axis.y[datum.axis] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;
    let formatter = d => (d);
    let item = '';

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    if (group) {
      item += `${group}: `;
    }

    item += formatter(datum.y);

    return item;
  }

  render(selection) {
    const { options, dispatchers } = this;
    let tooltip;

    if (!this.selection) {
      this.selection = selection;
    }

    if (!options.tooltip || options.tooltip.enabled) {
      tooltip = selection.append('div')
        .attr('class', CSS.getClassName('tooltip'));

      tooltip.append('div')
        .attr('class', CSS.getClassName('tooltip-header'));

      tooltip.append('div')
        .attr('class', CSS.getClassName('tooltip-content'));

      dispatchers.on('tooltipHide', () => {
        tooltip.style('display', 'none');
      });

      dispatchers.on('tooltipMove', (categoryIndex, category, mouse) => {
        this.renderTooltip(categoryIndex, category);
        this.positionTooltip(mouse);
      });

      dispatchers.on('highlightSeries.tooltip', (seriesIndex) => {
        selection.selectAll(CSS.getClassSelector('tooltip-item')).each(function (d, i) {
          select(this).attr('style', (i === seriesIndex) ? null : `opacity: ${UNHIGHLIGHTED_OPACITY};`);
        });
      });

      dispatchers.on('unHighlightSeries.tooltip', () => {
        selection.selectAll(CSS.getClassSelector('tooltip-item')).each(function () {
          select(this).attr('style', null);
        });
      });
    }

    return tooltip;
  }

  renderMultiSeries(categoryIndex, data) {
    const content = this.selection.selectAll(CSS.getClassSelector('tooltip-content'));

    const tooltipItems = content.selectAll(CSS.getClassSelector('tooltip-item'))
      .data(data);

    // if text items already exist then update them
    const textItems = content.selectAll(CSS.getClassSelector('tooltip-text'));
    textItems.text(d => (this.getFormattedItem(d.data[categoryIndex], d.label)));

    const item = tooltipItems
      .enter()
        .append('div')
        .attr('class', (d, i) => (
          classnames(
            CSS.getClassName('tooltip-item'),
            CSS.getColorClassName(i),
          )
        ));

    tooltipItems.classed(CSS.getClassName('tooltip-item-hidden'), d => (!!d.disabled));

    item
      .append('span')
      .attr('class', CSS.getClassName('series-indicator'))
      .attr('style', d => (d.color ? `background: ${d.color};` : null));

    item
      .append('span')
      .attr('class', CSS.getClassName('tooltip-text'))
      .text(d => (this.getFormattedItem(d.data[categoryIndex], d.label)));

    item.exit().remove();
    tooltipItems.exit().remove();
  }

  renderSingleSeries(categoryIndex, data) {
    const content = this.selection.selectAll(CSS.getClassSelector('tooltip-content'));

    const value = content.selectAll(CSS.getClassSelector('tooltip-value'))
      .data(data);

    value.enter().append('span')
      .attr('class', CSS.getClassName('tooltip-value'))
    .merge(value)
      .text(d => this.getFormattedItem(d.data[categoryIndex]));
  }

  renderTooltip(categoryIndex, category) {
    const { seriesData } = this;
    const data = this.getLegendValues(this.tooltipOptions.expanded, seriesData);
    const multiSeries = data.length > 1;

    this.selection.selectAll(CSS.getClassSelector('tooltip-header'))
      .text(this.getFormattedHeader(category));

    if (multiSeries) {
      this.renderMultiSeries(categoryIndex, data);
    } else {
      this.renderSingleSeries(categoryIndex, data);
    }
  }

  getTooltipDimensions() {
    const tooltip = this.selection.select(CSS.getClassSelector('tooltip'));
    const origDisplay = tooltip.style('display');

    // Make sure we display: block to get accurate dimensions
    tooltip.style('display', 'block');
    const rect = tooltip.node().getBoundingClientRect();

    // Reset to the original display
    tooltip.style('display', origDisplay);

    return { height: rect.height, width: rect.width };
  }

  positionTooltip(mouse) {
    const { dimensions } = this;

    if (!this.tooltipDimensions) {
      this.tooltipDimensions = this.getTooltipDimensions();
    }

    let mouseX = mouse[0] + dimensions.margins.left + TOOLTIP_POINTER_MARGIN;

    if ((mouseX + TOOLTIP_CONTAINER_OVERFLOW) >= (dimensions.left + dimensions.width)) {
      mouseX = (mouse[0] - this.tooltipDimensions.width) + TOOLTIP_POINTER_MARGIN;
    }

    let mouseY = mouse[1] + (dimensions.margins.top - (this.tooltipDimensions.height / 2));

    // Don't let tooltip bleed above the top
    if (mouseY < 0) {
      mouseY = TOOLTIP_VERTICAL_PADDING;
    }

    // Don't let the tooltip bleed below the bottom either
    if ((mouseY + this.tooltipDimensions.height) > dimensions.height) {
      mouseY = dimensions.height - this.tooltipDimensions.height - TOOLTIP_VERTICAL_PADDING;
    }

    // Pin to top if tooltip is taller than chart
    if (this.tooltipDimensions.height > dimensions.height) {
      mouseY = 0;
    }

    this.selection.selectAll(CSS.getClassSelector('tooltip'))
      .attr('style', () => (`display: block; top: ${mouseY}px; left: ${mouseX}px;`));
  }

  update(seriesData, dimensions, options, dispatchers) {
    this.tooltipDimensions = null;

    this.seriesData = seriesData;
    this.dimensions = dimensions;
    this.options = options;
    this.tooltipOptions = options.tooltip || {};
    this.dispatchers = dispatchers;
  }
}

export default Tooltip;
