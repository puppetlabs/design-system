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
    this.isZooming = false;

    dispatchers.on('zoomStart', () => {
      this.isZooming = true;
    });

    dispatchers.on('zoomEnd', () => {
      this.isZooming = false;
    });

    window.addEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setBodyDimensions();
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

  // For formatting the series, we just piggyback off the legend formatter. TODO: Should these have
  // their own formatter?
  getFormattedGroup(group) {
    const options = this.options;
    const optionFormatter = options.legend && options.legend.formatter;

    return helpers.getFormattedValue(optionFormatter, group);
  }

  getFormattedItem(datum, group) {
    const options = this.options;
    const yOptions = options.axis && options.axis.y ? options.axis.y[datum.axis] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;
    let item = '';

    if (group) {
      group = this.getFormattedGroup(group);

      item += `${group}: `;
    }

    item += helpers.getFormattedValue(optionFormatter, datum.y);

    if (datum.z !== undefined) {
      // TODO: Allow for passing z datum formatters
      item += ` (${helpers.getFormattedValue(null, datum.z)})`;
    }

    return item;
  }

  setBodyDimensions() {
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

  render() {
    const selection = select('body');

    const { options, dispatchers } = this;
    const tooltipClass = options && options.tooltips ? options.tooltips.class : '';
    let tooltip;

    if (!this.selection) {
      this.selection = selection;
    }

    if (!options.tooltips || options.tooltips.enabled) {
      tooltip = selection.append('div')
        .attr('class', classnames(CSS.getClassName('tooltip', `tooltip-${this.id}`), tooltipClass));

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
        if (!this.isZooming) {
          this.renderTooltip(categoryIndex, seriesIndex, category);
          this.positionTooltip(mouse);
        }
      });

      dispatchers.on('highlightSeries.tooltip', (seriesIndex) => {
        if (!this.isZooming) {
          selection.selectAll(CSS.getClassSelector('tooltip-item')).each(function (d) {
            select(this).attr('style', (d.seriesIndex === seriesIndex) ? null : `opacity: ${UNHIGHLIGHTED_OPACITY};`);
          });
        }
      });

      dispatchers.on('unHighlightSeries.tooltip', () => {
        if (!this.isZooming) {
          selection.selectAll(CSS.getClassSelector('tooltip-item')).each(function () {
            select(this).attr('style', null);
          });
        }
      });
    }

    return tooltip;
  }

  renderMultiSeries(categoryIndex, data) {
    const options = this.options;

    const content = this.selection
      .selectAll(CSS.getClassSelector(`tooltip-${this.id}`))
      .select(CSS.getClassSelector('tooltip-content'));

    let tooltipItems = content.selectAll(CSS.getClassSelector('tooltip-item'))
      .data(data, d => (d.seriesIndex));

    tooltipItems.exit().remove();

    const newTooltipItems = tooltipItems
      .enter()
      .append('div');

    const newSeriesIndicators = newTooltipItems.append('span');
    const newTooltipValues = newTooltipItems.append('span');

    tooltipItems = newTooltipItems.merge(tooltipItems);

    tooltipItems
      .attr('class', d => (
        classnames(
          CSS.getClassName('tooltip-item'),
          CSS.getColorClassName(d.seriesIndex),
        )
      ))
      .classed(CSS.getClassName('tooltip-item-hidden'), (d) => {
        const datum = d.data.filter(obj => (obj.categoryIndex === categoryIndex))[0];

        return !!d.disabled || datum.y === null;
      });

    let seriesIndicators = content.selectAll(CSS.getClassSelector('series-indicator'));

    seriesIndicators.exit().remove();

    seriesIndicators = newSeriesIndicators.merge(seriesIndicators);

    seriesIndicators
      .attr('class', CSS.getClassName('series-indicator'))
      .style('background', d => (d.color ? d.color : null))
      .style('opacity', d => (helpers.getSeriesIndicatorOpacity(d, options)));

    let tooltipValues = content.selectAll(CSS.getClassSelector('tooltip-value'));

    tooltipValues.exit().remove();

    tooltipValues = newTooltipValues.merge(tooltipValues);

    tooltipValues
      .attr('class', CSS.getClassName('tooltip-value'))
      .text((d) => {
        const datum = d.data.filter(obj => (obj.categoryIndex === categoryIndex))[0];

        return this.getFormattedItem(datum, d.label);
      });
  }

  renderSingleSeries(categoryIndex, data) {
    const content = this.selection
      .selectAll(CSS.getClassSelector(`tooltip-${this.id}`))
      .select(CSS.getClassSelector('tooltip-content'));

    let value = content.selectAll(CSS.getClassSelector('tooltip-value'))
      .data(data);

    value.exit().remove();

    value = value.enter()
      .append('div')
      .merge(value);

    value.attr('class', CSS.getClassName('tooltip-value'))
      .text((d) => {
        const datum = d.data.filter(obj => (obj.categoryIndex === categoryIndex))[0];

        return this.getFormattedItem(datum);
      });
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
      this.setBodyDimensions();
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
