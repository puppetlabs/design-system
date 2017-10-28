import clone from 'clone';
import deepmerge from 'deepmerge';
import { select } from 'd3-selection';
import Legend from './Legend';
import helpers from '../helpers/charting';
import CSS from '../helpers/css';
import XScale from './scales/XScale';
import YScale from './scales/YScale';
import XAxis from './axis/XAxis';
import YAxis from './axis/YAxis';

class Container {
  constructor(data, options, dispatchers) {
    this.data = data;
    this.options = options;
    this.type = options.type;
    this.dispatchers = dispatchers;
    this.dimensions = {
      width: options.width,
      height: options.height,
      defaultMargins: clone(options.margins), // these do not get modified by our code
      margins: options.margins, // these get modified to allow space for axis widths
    };
  }

  getDimensions() {
    const { top, right, bottom, left, width, height, margins, defaultMargins } = this.dimensions;

    return {
      top,
      right,
      bottom,
      left,
      width,
      height,
      margins,
      defaultMargins,
    };
  }

  getWrapper() {
    return this.wrapper;
  }

  getSVG() {
    return this.svg;
  }

  setWrapperDimensions() {
    const { top, left, right, bottom, width, height } = this.elem.getBoundingClientRect();

    this.dimensions.top = top;
    this.dimensions.right = right;
    this.dimensions.left = left;
    this.dimensions.bottom = bottom;
    this.dimensions.width = width;
    this.dimensions.height = height;

    // We set the width and height explicitly due to issues in Safari when rendering
    // within a flex container with 100% values.
    this.wrapper
      .style('height', `${height}px`)
      .style('width', `${width}px`);
  }

  setSVGMargins(dimensions) {
    const margins = this.dimensions.margins;

    if (this.type !== 'sparkline' && this.type !== 'donut' && margins.static !== true) {
      const options = this.options;
      const orientation = options.axis.x.orientation;
      const categories = this.data.getCategories().map(c => (c.label));

      if (this.testSVG) {
        this.testSVG.remove();
      }

      this.testSVG = this.wrapper.append('svg')
        .attr('width', this.dimensions.width)
        .style('width', `${this.dimensions.width}px`)
        .attr('height', this.dimensions.height)
        .style('height', `${this.dimensions.height}px`)
        .style('visibility', 'hidden');

      const xScale = new XScale(categories, options, dimensions);
      const x = xScale.generate();

      const xAxis = new XAxis(categories, x, dimensions, options);
      const tempX = xAxis.render(this.testSVG);
      let leftOverflow = 0;
      let rightOverflow = 0;
      const topOverflow = 0;
      const bottomOverflow = 0;

      if (tempX) {
        const tempXDimensions = tempX.node().getBoundingClientRect();

        if (orientation === 'left' || orientation === 'right') {
          const xAxisWidth = tempXDimensions.width;

          if (orientation === 'left') {
            this.dimensions.margins.left = xAxisWidth + dimensions.defaultMargins.left;
          } else {
            this.dimensions.margins.right = xAxisWidth + dimensions.defaultMargins.right;
          }
        } else {
          const xAxisHeight = tempXDimensions.height;

          if (orientation === 'top') {
            this.dimensions.margins.top = xAxisHeight + dimensions.defaultMargins.top;
          } else {
            this.dimensions.margins.bottom = xAxisHeight + dimensions.defaultMargins.bottom;
          }

          leftOverflow = this.dimensions.left - tempXDimensions.left;
          rightOverflow = tempXDimensions.right - this.dimensions.right;
        }
      }

      options.axis.y.forEach((yOptions, yAxisIndex) => {
        if (yOptions.enabled !== false && this.type !== 'donut') {
          const data = this.data.getDataByYAxis(yAxisIndex);
          const plotOptions =
            deepmerge(options, helpers.getPlotOptions(this.type, this.options, data));

          if (data.length > 0) {
            const yScale = new YScale(data, yOptions, plotOptions.layout, dimensions, options);
            const y = yScale.generate();

            const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
            const axis = yAxis.render(this.testSVG);

            // TODO: This is currently assuming there is only 1 left axis and 1 right axis
            // We haven't found a use case for more than 1 axis with the same orientation yet
            // If we do this will need to be updated.
            if (axis) {
              if (yOptions.orientation === 'top' || yOptions.orientation === 'bottom') {
                const yAxisHeight = axis.node().getBBox().height;

                if (yOptions.orientation === 'top') {
                  this.dimensions.margins.top = yAxisHeight + dimensions.defaultMargins.top;
                } else {
                  this.dimensions.margins.bottom = yAxisHeight + dimensions.defaultMargins.bottom;
                }
              } else {
                const yAxisWidth = axis.node().getBBox().width;

                if (yOptions.orientation === 'right') {
                  this.dimensions.margins.right = yAxisWidth + dimensions.defaultMargins.right;
                } else {
                  this.dimensions.margins.left = yAxisWidth + dimensions.defaultMargins.left;
                }
              }
            }
          }
        }
      });

      if (leftOverflow > 0 && leftOverflow > this.dimensions.margins.left) {
        this.dimensions.margins.left += (leftOverflow - this.dimensions.margins.left);
      }

      if (rightOverflow > 0 && rightOverflow > this.dimensions.margins.right) {
        this.dimensions.margins.right += (rightOverflow - this.dimensions.margins.right);
      }

      if (topOverflow > 0 && topOverflow > this.dimensions.margins.top) {
        this.dimensions.margins.top += (topOverflow - this.dimensions.margins.top);
      }

      if (bottomOverflow > 0 && bottomOverflow > this.dimensions.margins.bottom) {
        this.dimensions.margins.bottom += (bottomOverflow - this.dimensions.margins.bottom);
      }

      this.testSVG.remove();
    }
  }

  setSVGHeight({ height, margins }, legend) {
    const { options } = this;
    let newHeight = height - margins.top - margins.bottom;

    if (
        margins.static !== true &&
        legend &&
        (options.legend.orientation === 'top' || options.legend.orientation === 'bottom')
      ) {
      if (legend.height) {
        newHeight -= legend.height;
      }
    }

    this.dimensions.height = newHeight;
  }

  setSVGWidth({ width, margins }, legend) {
    const { options } = this;
    let newWidth = width - margins.left - margins.right;

    if (
      margins.static !== true &&
      legend &&
      (options.legend.orientation === 'left' || options.legend.orientation === 'right')
    ) {
      if (legend.width) {
        newWidth -= legend.width;
      }
    }

    this.dimensions.width = newWidth;
  }

  render(elem) {
    if (elem && !this.elem) {
      this.elem = elem;
    }

    this.renderWrapper(this.elem);
    this.setWrapperDimensions();

    const dimensions = this.getDimensions();

    this.setSVGMargins(dimensions);

    this.renderLegend();

    let legend;

    if (this.legend && this.legend.container) {
      legend = this.legend.container.node().getBoundingClientRect();
    }

    this.setSVGHeight(dimensions, legend);
    this.setSVGWidth(dimensions, legend);


    this.renderSVG();
  }

  renderWrapper(elem) {
    this.wrapper = select(elem)
      .append('div')
        .attr('class', CSS.getClassName('wrapper', this.type));
  }

  renderLegend() {
    if (this.type !== 'sparkline') {
      const { wrapper, data, options, dimensions, dispatchers } = this;
      const legendOptions = clone(options);
      const seriesData = data.getSeries();

      // Since donut only supports one series... always expand it.
      if (this.type === 'donut') {
        legendOptions.legend.expanded = true;
      }

      const legend = new Legend(seriesData, legendOptions, dimensions, dispatchers);

      legend.render(wrapper);

      this.legend = legend;
    }
  }

  renderSVG() {
    const { width, height, margins } = this.getDimensions();

    this.svg = this.wrapper
      .append('svg')
        .attr('class', CSS.getClassName('svg'))
        .attr('width', width + margins.left + margins.right)
        .style('width', `${width + margins.left + margins.right}px`)
        .attr('height', height + margins.top + margins.bottom)
        .style('height', `${height + margins.top + margins.bottom}px`)
      .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    return this;
  }

  update(data, options, dispatchers) {
    this.data = data;
    this.options = options;
    this.type = options.type;
    this.dispatchers = dispatchers;

    this.setWrapperDimensions();

    const dimensions = this.getDimensions();

    this.setSVGMargins(dimensions);

    let legend;

    if (this.legend && this.legend.container) {
      legend = this.legend.container.node().getBoundingClientRect();
    }

    this.setSVGHeight(dimensions, legend);
    this.setSVGWidth(dimensions, legend);

    const { width, height, margins } = this.getDimensions();

    this.wrapper.select('svg')
      .attr('width', width + margins.left + margins.right)
      .style('width', `${width + margins.left + margins.right}px`)
      .attr('height', height + margins.top + margins.bottom)
      .style('height', `${height + margins.top + margins.bottom}px`);
  }
}

export default Container;
