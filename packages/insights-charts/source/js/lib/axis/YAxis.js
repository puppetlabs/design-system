import { axisLeft, axisRight } from 'd3-axis';
import CSS from '../../helpers/css';
import formatters from '../../helpers/formatters';

class YAxis {
  constructor(y, dimensions, options, yAxisIndex) {
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;
    this.yAxisIndex = yAxisIndex;

    this.getAxisFormatter = this.getAxisFormatter.bind(this);
  }

  isRightAligned() {
    return this.options.orientation === 'right';
  }

  getAxisFormatter() {
    const options = this.options;
    const optionFormatter = options.labels && options.labels.formatter;
    let formatter;

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      // Only on the y axis do we want to convert numeric to the summary formatter.
      // For examples: this provides more spacing to the chart by converting 1,000,000 to 1M
      formatter = formatters[optionFormatter === 'numeric' ? 'summary' : optionFormatter];
    } else if (typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    } else {
      formatter = formatters.summary;
    }

    return formatter;
  }

  getAxisFunction(y, options) {
    const rightAligned = this.isRightAligned();
    let axis;

    if (rightAligned) {
      axis = axisRight(this.y);
    } else {
      axis = axisLeft(this.y);
    }

    if (options.ticks) {
      axis.ticks(options.ticks);
    }

    return axis.tickSizeOuter(0)
      .tickFormat(this.getAxisFormatter());
  }

  render(elem) {
    const options = this.options;
    const rightAligned = this.isRightAligned();
    const { height, width } = this.dimensions;

    if (options.enabled !== false) {
      const axis = this.getAxisFunction(this.y, options);
      let title;

      this.axis = elem.append('g')
        .attr('class', CSS.getClassName('axis', 'axis-y', `axis-y-${this.yAxisIndex}`))
        .call(axis);

      if (options.title) {
        title = this.axis.append('text')
          .attr('y', 0)
          .attr('dy', -40)
          .style('text-anchor', 'middle')
          .attr('class', CSS.getClassName('axis-title'))
          .text(options.title)
          .attr('x', -(height / 2))
          .attr('transform', 'rotate(-90)');
      }

      if (rightAligned) {
        this.axis.attr('transform', `translate(${width}, 0)`);

        if (title) {
          title.attr('x', (height / 2))
            .attr('transform', 'rotate(90)');
        }
      }
    }

    return this.axis;
  }

  update(y, dimensions, options) {
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;
    const rightAligned = this.isRightAligned();

    const axis = this.getAxisFunction(y, options);
    this.axis
      .call(axis);

    if (rightAligned) {
      this.axis.attr('transform', `translate(${this.dimensions.width}, 0)`);
    }
  }
}

export default YAxis;
