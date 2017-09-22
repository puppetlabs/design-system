import { select } from 'd3-selection';
import classnames from 'classnames';
import { TOOLTIP_POINTER_MARGIN, UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';

class Tooltip {
  constructor(seriesData, options, dispatchers, id) {
    this.id = id;
    this.options = options;
    this.seriesData = seriesData;
    this.dispatchers = dispatchers;

    this.onScroll = this.onScroll.bind(this);

    window.addEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (this.selection) {
      const dimensions = this.selection.node().getBoundingClientRect();
      const { width, left } = dimensions;
      let { top } = dimensions;

      if (window.scrollY) {
        top += window.scrollY;
      }

      this.bodyDimensions = { width, top, left };
    }
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
    const optionFormatter = options.tooltips && options.tooltips.formatter;

    return helpers.getFormattedValue(optionFormatter, category);
  }

  getFormattedItem(datum, group) {
    const options = this.options;
    const yOptions = options.axis && options.axis.y ? options.axis.y[datum.axis] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;
    let item = '';

    if (group) {
      item += `${group}: `;
    }

    item += helpers.getFormattedValue(optionFormatter, datum.y);

    return item;
  }

  render() {
    const selection = select('body');

    const { options, dispatchers } = this;
    let tooltip;

    if (!this.selection) {
      this.selection = selection;
    }

    if (!options.tooltips || options.tooltips.enabled) {
      tooltip = selection.append('div')
        .attr('class', CSS.getClassName('tooltip', `tooltip-${this.id}`));

      tooltip.append('div')
        .attr('class', CSS.getClassName('tooltip-header'));

      tooltip.append('div')
        .attr('class', CSS.getClassName('tooltip-content'));

      dispatchers.on('tooltipHide', () => {
        tooltip
          .style('display', 'none')
          .style('top', null)
          .style('left', null);
      });

      dispatchers.on('tooltipMove', (categoryIndex, seriesIndex, category, mouse) => {
        this.renderTooltip(categoryIndex, seriesIndex, category);
        this.positionTooltip(mouse);
      });

      dispatchers.on('highlightSeries.tooltip', (seriesIndex) => {
        selection.selectAll(CSS.getClassSelector('tooltip-item')).each(function (d) {
          select(this).attr('style', (d.seriesIndex === seriesIndex) ? null : `opacity: ${UNHIGHLIGHTED_OPACITY};`);
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
    const content = this.selection
      .selectAll(CSS.getClassSelector(`tooltip-${this.id}`))
      .select(CSS.getClassSelector('tooltip-content'));

    const tooltipItems = content.selectAll(CSS.getClassSelector('tooltip-item'))
      .data(data, d => (d.seriesIndex));

    // if text items already exist then update them
    const textItems = content.selectAll(CSS.getClassSelector('tooltip-text'));
    textItems.text(d => (this.getFormattedItem(d.data[categoryIndex], d.label)));

    const item = tooltipItems
      .enter()
        .append('div')
        .attr('class', d => (
          classnames(
            CSS.getClassName('tooltip-item'),
            CSS.getColorClassName(d.seriesIndex),
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
    const content = this.selection
      .selectAll(CSS.getClassSelector(`tooltip-${this.id}`))
      .select(CSS.getClassSelector('tooltip-content'));

    const value = content.selectAll(CSS.getClassSelector('tooltip-value'))
      .data(data);

    value.enter().append('span')
      .attr('class', CSS.getClassName('tooltip-value'))
    .merge(value)
      .text(d => (this.getFormattedItem(d.data[categoryIndex])));
  }

  renderTooltip(categoryIndex, seriesIndex, category) {
    const { seriesData, options, id } = this;
    const multiSeries = seriesData.length > 1;
    const simple = options.tooltips && options.tooltips.type === 'simple';

    this.selection
      .selectAll(CSS.getClassSelector(`tooltip-${id}`))
      .select(CSS.getClassSelector('tooltip-header'))
        .text(this.getFormattedHeader(category));

    if (multiSeries) {
      if (simple) {
        const series = seriesData.filter(s => (s.seriesIndex === seriesIndex));

        this.renderMultiSeries(categoryIndex, series);
      } else {
        this.renderMultiSeries(categoryIndex, seriesData);
      }
    } else {
      const series = seriesData.filter(s => (s.seriesIndex === seriesIndex));

      this.renderSingleSeries(categoryIndex, series);
    }
  }

  getTooltipDimensions() {
    const tooltip = this.selection.select(CSS.getClassSelector(`tooltip-${this.id}`));
    const origDisplay = tooltip.style('display');

    // Make sure we display: block to get accurate dimensions
    tooltip.style('display', 'block');
    const rect = tooltip.node().getBoundingClientRect();

    // Reset to the original display
    tooltip.style('display', origDisplay);

    return { height: rect.height, width: rect.width };
  }

  positionTooltip(mouse) {
    let mouseX = mouse[0];
    let mouseY = mouse[1];

    if (!this.tooltipDimensions) {
      this.tooltipDimensions = this.getTooltipDimensions();
    }

    if (!this.bodyDimensions) {
      const { width, top, left } = this.selection.node().getBoundingClientRect();

      this.bodyDimensions = { width, top, left };
    }

    const { tooltipDimensions, bodyDimensions } = this;

    mouseY -= (tooltipDimensions.height / 2);
    mouseY += bodyDimensions.top;

    if (
      (bodyDimensions.left + bodyDimensions.width) <
      (mouseX + tooltipDimensions.width + TOOLTIP_POINTER_MARGIN)
    ) {
      mouseX -= (TOOLTIP_POINTER_MARGIN + this.tooltipDimensions.width);
      mouseX += bodyDimensions.left;
    } else {
      mouseX += TOOLTIP_POINTER_MARGIN + bodyDimensions.left;
    }

    this.selection.selectAll(CSS.getClassSelector(`tooltip-${this.id}`))
      .attr('style', () => (`display: block; top: ${mouseY}px; left: ${mouseX}px;`));
  }

  update(seriesData, options, dispatchers, id) {
    this.bodyDimensions = null;
    this.tooltipDimensions = null;

    this.seriesData = seriesData;
    this.options = options;
    this.dispatchers = dispatchers;
    this.id = id;
  }

  destroy() {
    this.selection.select(CSS.getClassSelector(`tooltip-${this.id}`)).remove();

    window.removeEventListener('scroll', this.onScroll);
  }
}

export default Tooltip;
