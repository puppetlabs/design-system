import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';
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
      formatter = formatters[optionFormatter];
    } else if (typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    } else {
      formatter = formatters.numeric;
    }

    return formatter;
  }

  getAxisFunction(y, options) {
    const orientation = options.orientation;
    let axis;

    switch (orientation) {
      case 'top':
        axis = axisTop(y);
        break;
      case 'right':
        axis = axisRight(y);
        break;
      case 'bottom':
        axis = axisBottom(y);
        break;
      default:
        axis = axisLeft(y);
    }

    if (options.ticks) {
      axis.ticks(options.ticks);
    }

    return axis.tickSizeOuter(0)
      .tickFormat(this.getAxisFormatter());
  }

  render(elem) {
    const options = this.options;
    const orientation = options.orientation || 'left';
    const { height, width } = this.dimensions;

    if (elem) {
      this.elem = elem;
    }

    if (options.enabled !== false) {
      const axis = this.getAxisFunction(this.y, options);
      let translate;

      switch (orientation) {
        case 'top':
          translate = '0, 0';
          break;
        case 'right':
          translate = `${width}, 0`;
          break;
        case 'bottom':
          translate = `0, ${height}`;
          break;
        default:
          translate = '0, 0';
      }

      this.axis = this.elem.append('g')
        .attr('class', CSS.getClassName('axis', 'axis-y', `axis-y-${this.yAxisIndex}`))
        .attr('transform', `translate(${translate})`)
        .call(axis);

      if (options.title) {
        this.axis.append('text')
          .attr('y', 0)
          .attr('x', () => {
            let xPos;

            if (orientation === 'bottom' || orientation === 'top') {
              xPos = width / 2;
            } else {
              xPos = -(height / 2);

              if (this.isRightAligned()) {
                xPos = Math.abs(xPos);
              }
            }

            return xPos;
          })
          .attr('dy', () => {
            let result;

            try {
              const yAxis = this.elem.select(CSS.getClassSelector(`axis-y-${this.yAxisIndex}`)).node().getBBox();

              if (orientation === 'left' || orientation === 'right') {
                result = -yAxis.width - 15;
              } else {
                result = yAxis.height + 15;
              }
            } catch (e) {
              result = 0;
            }

            return result;
          })
          .style('text-anchor', 'middle')
          .attr('class', CSS.getClassName('axis-title'))
          .text(options.title)
          .attr('transform', () => {
            let rotation;

            switch (orientation) {
              case 'right':
                rotation = 90;
                break;
              case 'left':
                rotation = -90;
                break;
              default:
                rotation = 0;
            }

            return `rotate(${rotation})`;
          });
      }
    }

    return this.axis;
  }

  update(y, dimensions, options) {
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;

    if (this.axis) {
      this.axis.remove();
    }

    this.render();
  }
}

export default YAxis;
