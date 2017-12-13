import { select } from 'd3-selection';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';
import moment from 'moment';
import CSS from '../../helpers/css';
import helpers from '../../helpers/charting';
import formatters from '../../helpers/formatters';

const TRUNCATED_LIMIT = 0.3;
const BANDWIDTH_WRAP_MIN = 20;
const TICK_PADDING = 10;

class XAxis {
  constructor(categories, x, dimensions, options) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.options = options;
    this.axisOptions = options.axis.x;
    this.scaleType = helpers.detectScaleType(categories);

    this.maxLinesExceeded = false;
    this.improperlyTruncated = false;
    this.labelsRotated = false;

    this.wrap = this.wrap.bind(this);
    this.rotate = this.rotate.bind(this);
    this.remove = this.remove.bind(this);
  }

  getAxisFormatter() {
    const options = this.axisOptions;
    const optionFormatter = options.labels && options.labels.formatter;
    let formatter = d => (d);

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      formatter = formatters[optionFormatter];
    } else if (typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    } else if (this.scaleType === 'date' && !optionFormatter) {
      formatter = d => (moment(d).format('l'));
    }

    return formatter;
  }

  getLabelsRotatation() {
    const options = this.axisOptions;
    let result = false;

    if (options.labels && options.labels.rotated) {
      result = true;
    }

    return result;
  }

  getLabelsSmart() {
    const options = this.axisOptions;
    let result = true;

    if (options.labels && options.labels.smart === false) {
      result = false;
    }

    return result;
  }

  getAxisFunction(x, options) {
    const orientation = options && options.orientation ? options.orientation : 'bottom';
    let axis;

    switch (orientation) {
      case 'top':
        axis = axisTop(x);
        break;
      case 'right':
        axis = axisRight(x);
        break;
      case 'left':
        axis = axisLeft(x);
        break;
      default:
        axis = axisBottom(x);
    }

    axis = axis
      .tickSizeOuter(0)
      .tickFormat(this.getAxisFormatter());

    if (options.ticks) {
      axis.ticks(options.ticks);
    }

    return axis;
  }

  wrap(selection) {
    const maxLines = 3;
    const tickCount = selection.size();
    const shouldRotate = this.getLabelsRotatation();
    const shouldWrapAndRotate = this.getLabelsSmart();
    const truncatedLimit = TRUNCATED_LIMIT;
    const bandwidth = this.x && this.x.bandwidth ? this.x.bandwidth() : 0;
    let truncatedLabels = 0;

    this.maxLinesExceeded = false;
    this.improperlyTruncated = false;

    // If we are rendering a continuous scale then we never want wrap. Alternatively if the user
    // has explicitly set rotate to true then lets not worry about wrapping
    if (
      this.scaleType !== 'ordinal' ||
      shouldRotate ||
      !shouldWrapAndRotate ||
      bandwidth < BANDWIDTH_WRAP_MIN
    ) {
      // if the bandwidth is less than 20 and the scale type is ordinal then lets just plan on
      // wrapping the labels as part of the next step
      if (bandwidth < BANDWIDTH_WRAP_MIN && this.scaleType === 'ordinal') {
        this.improperlyTruncated = true;
      }

      return selection;
    }

    // if there is no bandwidth then there is nothing to determine how we should
    // wrap the labels
    if (bandwidth) {
      selection.each((data, index, items) => {
        const tick = select(items[index]);
        const label = tick.select('text');
        const labelText = label.text();

        if (!this.maxLinesExceeded && !this.improperlyTruncated) {
          const fontSize = parseInt(label.style('font-size'), 10);
          const lineHeight = parseInt(label.style('line-height'), 10);
          const tspanLineHeight = lineHeight / fontSize;
          const words = labelText.split(/\s+/).reverse();
          const x = label.attr('x');
          const y = label.attr('y');
          const dy = parseFloat(label.attr('dy'), 10);

          let lineNumber = 1;
          let line = [];
          let word;

          label.text(null);

          let tspan = label.append('tspan')
            .attr('x', x || 0)
            .attr('y', y)
            .attr('dy', `${dy}em`)
            .text(null);

          while (words.length && !this.maxLinesExceeded && !this.improperlyTruncated) {
            // Get the last word in the label
            word = words.pop();

            line.push(word);
            const currentLine = line.join(' ');

            tspan.text(currentLine);

            const tspanWidth = tspan.node().getComputedTextLength();

            // If the current tspan is wider than the space allotted then we need to either wrap
            // or truncate
            if (tspanWidth > bandwidth) {
              line.pop();

              // If there are still lines available after removing the last one then wrap by
              // creating a new tspan and appending that to the label
              if (line.length) {
                tspan.text(line.join(' '));
                line = [word];

                tspan = label.append('tspan')
                  .attr('x', 0)
                  .attr('y', y)
                  .attr('dy', `${(lineNumber * tspanLineHeight) + dy}em`)
                  .text(word);

                lineNumber += 1;
              // If there are no lines left then and the label is still wider then truncate
              } else {
                const widthPerLetter = tspanWidth / currentLine.length;
                const overflow = tspanWidth - bandwidth;
                const lettersToTrim = Math.ceil(overflow / widthPerLetter) + 3;

                // We are truncate a line before the last line. This needs to trigger label rotation
                if (words.length > 0) {
                  this.improperlyTruncated = true;
                } else if (words.length === 0) {
                  truncatedLabels += 1;

                  if (truncatedLabels / tickCount >= truncatedLimit) {
                    this.improperlyTruncated = true;
                  }
                }

                // We had previously removed this from words, but due to it being longer than the
                // bandwidth we need to put it back in so that it can be displayed with ellipsis
                if (currentLine !== '...') {
                  words.push(`${currentLine.slice(0, -lettersToTrim)}...`);
                  label.append('title').text(labelText);
                }
              }
            }
          }

          this.maxLinesExceeded = lineNumber > maxLines;
        }
      });
    }

    return selection;
  }

  rotate(selection) {
    const shouldRotate = this.getLabelsRotatation();
    this.labelsRotated = false;

    if (this.maxLinesExceeded || this.improperlyTruncated || shouldRotate) {
      selection.each((data, index, items) => {
        const tick = select(items[index]);
        const label = tick.select('text');
        const x = label.attr('x');
        const labelTitle = label.select('title');
        let labelText = labelTitle.size() > 0 ? labelTitle.text() : label.text();
        const titleText = labelText;

        label.text(null);

        const tspan = label.append('tspan')
          .attr('x', x)
          .text(labelText);

        label.attr('transform', 'rotate(-45)')
          .style('text-anchor', 'end');

        // We need to refactor our measurements in container. Instead of modifying height and
        // width we should create an svg object which we assign the mutated values to.
        // In the mean time we can count on the top and the bottom of the wrapper to give a
        // consistent height

        const labelRect = label.node().getBoundingClientRect();
        const maxLabelHeight = (this.dimensions.bottom - this.dimensions.top) * 0.40;

        if (labelRect.height > maxLabelHeight) {
          const overflow = labelRect.height - maxLabelHeight;
          const heightPerLetter = labelRect.height / labelText.length;
          const lettersToTrim = Math.ceil(overflow / heightPerLetter) + 3;
          labelText = `${labelText.slice(0, -lettersToTrim)}...`;

          tspan.text(labelText);
          label.append('title').text(titleText);
        }

        /*
         * The following code would truncase labels if they overflowed the left side of the svg.
         * We have decide to allow overflow for now. This may be useful down the road if we deem
         * that decision to be dumb
        if (hasBandwidth) {
          labelRect = label.node().getBoundingClientRect();

          if (labelRect.left < this.dimensions.left) {
            const overflow = this.dimensions.left - labelRect.left;
            const widthPerLetter = labelRect.width / labelText.length;
            const lettersToTrim = Math.ceil(overflow / widthPerLetter) + 3;
            labelText = `${labelText.slice(0, -lettersToTrim)}...`;

            tspan.text(labelText);
          }
        }
        */
      });

      this.labelsRotated = true;
    }
  }

  remove(selection) {
    const shouldWrapAndRotate = this.getLabelsSmart();
    const ticks = [];
    const padding = TICK_PADDING;
    let totalTickWidth = 0;

    const doesOverflow = (tickArray, width) => {
      let totalWidth = 0;

      tickArray.forEach((t) => {
        totalWidth += t.width;
      });

      return totalWidth > width;
    };

    // If the labels are rotated then use the following algorithm to pluck labels
    if (this.labelsRotated) {
      selection.each((data, index, items) => {
        const tick = select(items[index]);
        const label = tick.select('text');
        const fontSize = parseInt(label.style('font-size'), 10);
        const tickWidth = fontSize + padding;
        const tickObj = { elem: tick, width: tickWidth };
        ticks.push(tickObj);
        totalTickWidth += tickWidth;
      });
    // If the labels are NOT rotated then use the following algorithm to pluck labels
    } else if (
      !this.labelsRotated &&
      (this.scaleType !== 'ordinal' || (this.scaleType === 'ordinal' && !shouldWrapAndRotate))
    ) {
      selection.each((data, index, items) => {
        const tick = select(items[index]);
        const tickRect = tick.node().getBoundingClientRect();
        const tickWidth = tickRect.width + padding;
        const tickObj = { elem: tick, width: tickWidth };
        ticks.push(tickObj);
        totalTickWidth += tickWidth;
      });
    }

    if (ticks.length && totalTickWidth >= this.dimensions.width) {
      let stride = 2;
      let overflows = true;

      while (overflows) {
        // eslint-disable-next-line no-loop-func
        const newTicks = ticks.filter((tick, index) => (index % stride === 0));

        // If we are down to our last tick then we'll deal with an overflow
        if (newTicks.length <= 1) {
          overflows = false;
        } else {
          overflows = doesOverflow(newTicks, this.dimensions.width);
        }

        // if the ticks still overflow after we've plucked some then lets go back around for
        // another round
        stride = overflows ? stride + 1 : stride;
      }

      // Remove every x tick
      ticks.forEach((tick, index) => {
        if (index % stride) {
          tick.elem.remove();
        }
      });
    }
  }

  render(elem) {
    const { height, width } = this.dimensions;
    const options = this.axisOptions;
    const orientation = options && options.orientation ? options.orientation : 'bottom';

    if (elem) {
      this.elem = elem;
    }

    if (options.enabled !== false) {
      const axis = this.getAxisFunction(this.x, options);

      let translate;

      switch (orientation) {
        case 'top':
          translate = '0, 0';
          break;
        case 'right':
          translate = `${width}, 0`;
          break;
        case 'left':
          translate = '0, 0';
          break;
        default:
          translate = `0, ${height}`;
      }

      this.axis = this.elem
        .append('g')
          .attr('class', CSS.getClassName('axis', 'axis-x'))
          .attr('transform', `translate(${translate})`)
          .call(axis);

      if (orientation === 'top' || orientation === 'bottom') {
        this.axis.selectAll('.tick')
          .call(this.wrap)
          .call(this.rotate)
          .call(this.remove);
      }

      if (options.title) {
        this.axis.append('text')
          .attr('y', 0)
          .attr('dy', () => {
            let result;

            try {
              const xAxis = this.elem.select(CSS.getClassSelector('axis-x')).node().getBBox();

              if (orientation === 'left' || orientation === 'right') {
                result = xAxis.width;
              } else {
                result = xAxis.height;
              }

              result += 15;
            } catch (e) {
              result = 0;
            }

            return result;
          })
          .attr('x', () => {
            let xPos;

            if (orientation === 'left' || orientation === 'right') {
              xPos = height / 2;

              if (orientation === 'right') {
                xPos = -xPos;
              }
            } else {
              xPos = width / 2;
            }

            return xPos;
          })
          .style('text-anchor', 'middle')
          .attr('transform', () => {
            let rotation;

            switch (orientation) {
              case 'left':
                rotation = 90;
                break;
              case 'right':
                rotation = -90;
                break;
              default:
                rotation = 0;
            }


            return `rotate(${rotation})`;
          })
          .attr('class', CSS.getClassName('axis-title'))
          .text(options.title);
      }
    }

    return this.axis;
  }

  update(categories, x, dimensions, options) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.axisOptions = options.axis.x;
    this.options = options;
    this.scaleType = helpers.detectScaleType(categories);

    if (this.axis) {
      this.axis.remove();
    }

    this.render();
  }
}

export default XAxis;
