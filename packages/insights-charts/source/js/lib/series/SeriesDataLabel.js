import CSS from '../../helpers/css';
import formatters from '../../helpers/formatters';
import helpers from '../../helpers/charting';
import Series from './Series';
import { DATA_LABEL_MARGIN, VIZ_TYPES } from '../../constants';

class SeriesDataLabel extends Series {
  constructor(
    data,
    dimensions,
    x,
    y,
    clipPathId,
    options,
    dispatchers,
    yAxisIndex,
    x1,
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
      'series-data-label',
      x1,
    );

    this.renderCount = 0;

    this.getX = this.getX.bind(this);
    this.getY = this.getY.bind(this);
    this.getTransform = this.getTransform.bind(this);
    this.getVisibility = this.getVisibility.bind(this);
    this.getTextAnchor = this.getTextAnchor.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
  }

  isHorizontal() {
    const { orientation } = this.options.axis.x;

    return orientation === 'left' || orientation === 'right';
  }

  isGrouped() {
    return this.options.layout === 'grouped';
  }

  getVisibility(d, node) {
    const { options, y } = this;
    let visibility = 'visible';

    if (options.type === VIZ_TYPES.COLUMN) {
      const barLength = helpers.getColumnLength(options, y, d, this.yAxisIndex);
      const textRect = node.parentNode.getBBox();
      const labelLength = this.isHorizontal()
        ? textRect.width
        : textRect.height;

      if (barLength < labelLength + DATA_LABEL_MARGIN) {
        visibility = 'hidden';
      }
    }

    return visibility;
  }

  getX(d) {
    const { x, x1 } = this;
    let result;

    if (this.isGrouped()) {
      result = x1(d.seriesLabel);
    } else {
      result = x(d.x);

      if (x.bandwidth) {
        result += x.bandwidth() / 2;
      }
    }

    return result;
  }

  getY(d) {
    const { y, options } = this;
    const { orientation } = options.axis.x;
    const isYAxisReversed = options.axis.y[this.yAxisIndex].reversed;
    const isStacked = options.layout === 'stacked';
    const isRotated = orientation === 'left' || orientation === 'right';
    const isColumn = options.type === VIZ_TYPES.COLUMN;
    const isBubble = options.type === VIZ_TYPES.BUBBLE;

    const datumMin = d.y0;
    const datumMax = d.y;

    let result;

    if (isStacked && !isBubble) {
      result = y(datumMin + datumMax);
    } else {
      result = y(datumMax);
    }

    let dataLabelMargin = 0;
    if (!isBubble) {
      dataLabelMargin = isYAxisReversed
        ? -DATA_LABEL_MARGIN
        : DATA_LABEL_MARGIN;
    }

    if (
      (d.y < 0 && !isColumn && !isRotated) ||
      (d.y > 0 && !isColumn && isRotated) ||
      (d.y > 0 && isColumn && !isRotated) ||
      (d.y < 0 && isColumn && isRotated)
    ) {
      result += dataLabelMargin;
    } else {
      result -= dataLabelMargin;
    }

    return result;
  }

  getTransform(d) {
    const { x, x1 } = this;
    let translate;

    if (this.isGrouped()) {
      const xPos = x(d.x) + x1.bandwidth() / 2;

      if (this.isHorizontal()) {
        translate = `translate(0,${xPos})`;
      } else {
        translate = `translate(${xPos},0)`;
      }
    }

    return translate;
  }

  getTextAnchor(node, d) {
    const textRect = node.getBoundingClientRect();
    const isColumn = this.options.type === VIZ_TYPES.COLUMN;
    const isBubble = this.options.type === VIZ_TYPES.BUBBLE;
    let anchor = 'middle';
    const isYAxisReversed = this.options.axis.y[this.yAxisIndex].reversed;
    const leftEdge = this.dimensions.left + this.dimensions.margins.left;
    const rightEdge = this.dimensions.right - this.dimensions.margins.right;

    if (isColumn && this.isHorizontal()) {
      if (d.y < 0) {
        anchor = 'start';
      } else {
        anchor = 'end';
      }
    } else if (!isColumn && !isBubble) {
      if (
        textRect.left <= leftEdge &&
        textRect.left + textRect.width >= leftEdge
      ) {
        anchor = 'start';
      } else if (
        textRect.right >= rightEdge &&
        textRect.right - textRect.width <= rightEdge
      ) {
        anchor = 'end';
      }
    }

    if (isYAxisReversed && anchor === 'start') {
      anchor = 'end';
    } else if (isYAxisReversed && anchor === 'end') {
      anchor = 'start';
    }

    return anchor;
  }

  getFormattedValue(d) {
    const { options } = this;
    const yOptions =
      options.axis && options.axis.y ? options.axis.y[this.yAxisIndex] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;
    let formatter = value => value;

    if (
      optionFormatter &&
      Object.keys(formatters).indexOf(optionFormatter) >= 0
    ) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    return formatter(d.y);
  }

  render(selection) {
    this.renderCount += 1;

    const self = this;
    const { options } = this;
    const enabled = options.data_labels && options.data_labels.enabled;

    if (!this.selection) {
      this.selection = selection;
    }

    if (enabled) {
      this.series = selection
        .selectAll(CSS.getClassSelector(this.selector))
        .data(this.data, d => d.seriesIndex);

      this.series.exit().remove();

      this.series = this.series
        .enter()
        .append('g')
        .merge(this.series);

      this.series.attr('class', d =>
        CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`),
      );

      this.groups = this.series
        .selectAll(CSS.getClassSelector('data-label-group'))
        .data(
          d => (!d.disabled ? d.data : []),
          d => d.categoryIndex,
        );

      this.groups.exit().remove();

      const newGroups = this.groups.enter().append('g');

      newGroups
        .append('text')
        .attr('class', CSS.getClassName('data-label-shadow'));
      newGroups.append('text').attr('class', CSS.getClassName('data-label'));

      this.groups = newGroups
        .merge(this.groups)
        .attr('class', CSS.getClassName('data-label-group'));

      let shadows = this.groups.selectAll(
        CSS.getClassSelector('data-label-shadow'),
      );

      shadows = shadows
        .attr('class', CSS.getClassName('data-label-shadow'))
        .text(this.getFormattedValue)
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function(d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function(d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        })
        .attr('opacity', 0)
        .classed(CSS.getClassName('data-label-hidden'), this.getHiddenClass);

      let labels = this.groups.selectAll(CSS.getClassSelector('data-label'));

      labels = labels
        .attr('class', CSS.getClassName('data-label'))
        .text(this.getFormattedValue)
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function(d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function(d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        })
        .attr('opacity', 0)
        .classed(CSS.getClassName('data-label-hidden'), this.getHiddenClass);

      // We only want to animate in the data labels on the first render. Subsequent updates should
      // simply display them
      if (
        this.renderCount === 1 &&
        options.animations &&
        options.animations.enabled
      ) {
        shadows
          .transition()
          .delay(options.animations.duration)
          .duration(options.animations.duration / 4)
          .attr('opacity', 1);

        labels
          .transition()
          .delay(options.animations.duration)
          .duration(options.animations.duration / 4)
          .attr('opacity', 1);
      } else {
        shadows.attr('opacity', 1);
        labels.attr('opacity', 1);
      }
    }

    return this.series;
  }
}

export default SeriesDataLabel;
