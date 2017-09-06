import CSS from '../../helpers/css';
import formatters from '../../helpers/formatters';
import helpers from '../../helpers/charting';
import Series from './Series';
import { DATA_LABEL_MARGIN } from '../../constants';

class SeriesDataLabel extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, x1) {
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

    this.getX = this.getX.bind(this);
    this.getY = this.getY.bind(this);
    this.getTransform = this.getTransform.bind(this);
    this.getVisibility = this.getVisibility.bind(this);
    this.getTextAnchor = this.getTextAnchor.bind(this);
    this.getFormattedValue = this.getFormattedValue.bind(this);
  }

  isHorizontal() {
    const orientation = this.options.axis.x.orientation;

    return orientation === 'left' || orientation === 'right';
  }

  isGrouped() {
    return this.options.layout === 'grouped';
  }

  getVisibility(d, node) {
    const { options, dimensions, y } = this;
    let visibility = 'visible';

    if (options.type === 'column') {
      const barLength = helpers.getColumnLength(options, dimensions, y, d);
      const textRect = node.parentNode.getBBox();
      const labelLength = this.isHorizontal() ? textRect.width : textRect.height;

      if (barLength < (labelLength + DATA_LABEL_MARGIN)) {
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
    const isStacked = options.layout === 'stacked';
    const isColumn = options.type === 'column';
    let result;

    if (isStacked) {
      if (d.y < 0 && d.y0 > 0) {
        result = y(d.y);
      } else {
        result = y(d.y0 + d.y);
      }
    } else {
      result = y(d.y);
    }

    if (
      (d.y < 0 && !isColumn && !this.isHorizontal()) ||
      (d.y >= 0 && !isColumn && this.isHorizontal()) ||
      (d.y > 0 && isColumn && !this.isHorizontal()) ||
      (d.y < 0 && isColumn && this.isHorizontal())
    ) {
      result += DATA_LABEL_MARGIN;
    } else {
      result -= DATA_LABEL_MARGIN;
    }

    return result;
  }

  getTransform(d) {
    const { x, x1 } = this;
    let translate;

    if (this.isGrouped()) {
      const xPos = x(d.x) + (x1.bandwidth() / 2);

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
    const isColumn = this.options.type === 'column';
    let anchor = 'middle';
    const leftEdge = this.dimensions.left + this.dimensions.margins.left;
    const rightEdge = this.dimensions.right - this.dimensions.margins.right;

    if (isColumn && this.isHorizontal()) {
      if (d.y < 0) {
        anchor = 'start';
      } else {
        anchor = 'end';
      }
    } else if (!isColumn) {
      if (textRect.left <= leftEdge && (textRect.left + textRect.width) >= leftEdge) {
        anchor = 'start';
      } else if (textRect.right >= rightEdge && (textRect.right - textRect.width) <= rightEdge) {
        anchor = 'end';
      }
    }

    return anchor;
  }

  getFormattedValue(d) {
    const options = this.options;
    const yOptions = options.axis && options.axis.y ? options.axis.y[this.yAxisIndex] : {};
    const optionFormatter = yOptions.values && yOptions.values.formatter;
    let formatter = value => (value);

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    return formatter(d.y);
  }

  render(selection) {
    const self = this;
    const options = this.options;
    const enabled = options.data_labels && options.data_labels.enabled;

    if (!this.selection) {
      this.selection = selection;
    }

    if (enabled) {
      this.series = selection.selectAll(CSS.getClassSelector(this.selector))
        .data(this.data, d => (d.seriesIndex));

      this.series.selectAll(CSS.getClassSelector('data-label-shadow'))
        .text(this.getFormattedValue)
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function (d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function (d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        });

      this.series.selectAll(CSS.getClassSelector('data-label'))
        .text(this.getFormattedValue)
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function (d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function (d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        });

      this.series.exit().remove();

      const container = this.series.enter()
        .append('g')
          .attr('class', d => (CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`)))
        .selectAll(CSS.getClassSelector('data-label'))
          .data(d => (!d.disabled ? d.data : []))
          .enter()
        .append('g');

      const shadows = container.append('text')
        .text(this.getFormattedValue)
        .attr('class', CSS.getClassName('data-label-shadow'))
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function (d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function (d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        })
        .attr('opacity', 0)
        .classed(CSS.getClassName('data-label-hidden'), this.getHiddenClass);

      const labels = container.append('text')
        .attr('class', CSS.getClassName('data-label'))
        .text(this.getFormattedValue)
        .attr('x', this.isHorizontal() ? this.getY : this.getX)
        .attr('y', this.isHorizontal() ? this.getX : this.getY)
        .attr('transform', this.getTransform)
        .attr('text-anchor', function (d) {
          return self.getTextAnchor(this, d);
        })
        .attr('style', function (d) {
          return `visibility: ${self.getVisibility(d, this)};`;
        })
        .attr('opacity', 0)
        .classed(CSS.getClassName('data-label-hidden'), this.getHiddenClass);

      if (options.animations && options.animations.enabled) {
        shadows.transition()
          .delay(options.animations.duration)
          .duration(options.animations.duration / 4)
          .attr('opacity', 1);

        labels.transition()
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
