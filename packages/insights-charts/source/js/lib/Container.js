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
    return this.g;
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

  setSVGMargins() {
    const dimensions = this.dimensions;
    const margins = this.dimensions.margins;

    if (this.type !== 'sparkline' && this.type !== 'donut' && margins.static !== true) {
      const options = this.options;
      const orientation = options.axis.x.orientation;
      const categories = this.data.getCategories().map(c => (c.label));

      if (this.testSVG) {
        this.testSVG.remove();
      }

      // always start with the defaults and build from there
      this.dimensions.margins.top = this.dimensions.defaultMargins.top;
      this.dimensions.margins.right = this.dimensions.defaultMargins.right;
      this.dimensions.margins.bottom = this.dimensions.defaultMargins.bottom;
      this.dimensions.margins.left = this.dimensions.defaultMargins.left;

      this.testSVG = this.wrapper
        .append('svg')
          .attr('width', this.dimensions.width)
          .style('width', `${this.dimensions.width}px`)
          .attr('height', this.dimensions.height)
          .style('height', `${this.dimensions.height}px`);

      this.testG = this.testSVG.append('g');

      options.axis.y.forEach((yOptions, yAxisIndex) => {
        if (yOptions.enabled !== false && this.type !== 'donut') {
          let data = this.data.getDataByYAxis(yAxisIndex);

          if (data.length > 0) {
            let type = this.type;

            if (type === 'combination') {
              type = data[0].type;
            }

            const plotOptions = deepmerge(
              options,
              helpers.getPlotOptions(type, this.options, data),
            );

            if (plotOptions.layout === 'stacked') {
              data = helpers.stackData(data);
            }

            const yScale = new YScale(data, yOptions, plotOptions.layout, dimensions, options);
            const y = yScale.generate();

            const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
            const axis = yAxis.render(this.testG);

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

      this.testG.attr('transform', `translate(${this.dimensions.margins.left}, ${this.dimensions.margins.top})`);

      // The width of the x axis needs to take into account the margins applied by the y axis
      // Otherwise the smart label wrapping and auto rotation don't work as expected
      const dims = Object.assign({}, this.dimensions);
      dims.width = dims.width - dims.margins.left - dims.margins.right;

      const xScale = new XScale(categories, options, dims);
      const x = xScale.generate();

      const xAxis = new XAxis(categories, x, dims, options);
      const tempX = xAxis.render(this.testG);

      let rightOverflow = 0;
      let leftOverflow = 0;

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

      if (leftOverflow > 0) {
        this.dimensions.margins.left += Math.ceil(leftOverflow);
      }

      if (rightOverflow > 0) {
        this.dimensions.margins.right += Math.ceil(rightOverflow);
      }

      this.testSVG.remove();
    }
  }

  setSVGHeight() {
    const margins = this.dimensions.margins;

    this.dimensions.height = this.dimensions.height - margins.top - margins.bottom;
  }

  setSVGWidth() {
    const margins = this.dimensions.margins;

    this.dimensions.width = this.dimensions.width - margins.left - margins.right;
  }

  render(elem) {
    if (elem && !this.elem) {
      this.elem = elem;
    }

    this.renderWrapper(this.elem);
    this.setWrapperDimensions();

    this.renderLegend();

    this.setSVGMargins();

    let legend;

    if (this.legend && this.legend.container) {
      legend = this.legend.container.node().getBoundingClientRect();
    }

    this.setSVGHeight();
    this.setSVGWidth();

    this.renderSVG(legend);
  }

  renderWrapper(elem) {
    this.wrapper = select(elem)
      .append('div')
        .attr('class', CSS.getClassName('wrapper', this.type));
  }

  renderLegend() {
    if (this.type !== 'sparkline') {
      const { wrapper, data, options, dimensions, dispatchers } = this;
      const margins = dimensions.margins;
      const legendOptions = clone(options);
      const seriesData = data.getSeries();
      let legendRect = {};

      // Since donut only supports one series... always expand it.
      if (this.type === 'donut') {
        legendOptions.legend.expanded = true;
      }

      const legend = new Legend(seriesData, legendOptions, dimensions, dispatchers);

      legend.render(wrapper);

      if (legend.container) {
        legendRect = legend.container.node().getBoundingClientRect();
      }

      if (
        margins.static !== true &&
        legendRect.height &&
        (options.legend.orientation === 'top' || options.legend.orientation === 'bottom')
      ) {
        this.dimensions.height -= legendRect.height;
      }

      if (
        margins.static !== true &&
        legendRect.width &&
        (options.legend.orientation === 'left' || options.legend.orientation === 'right')
      ) {
        dimensions.width -= legendRect.width;
      }

      this.legend = legend;
    }
  }

  renderSVG(legend) {
    const { width, height, margins } = this.getDimensions();
    const { options } = this;

    this.svg = this.wrapper
      .append('svg')
        .attr('class', CSS.getClassName('svg'))
        .attr('width', width + margins.left + margins.right)
        .style('width', `${width + margins.left + margins.right}px`)
        .attr('height', height + margins.top + margins.bottom)
        .style('height', `${height + margins.top + margins.bottom}px`)
        .style('margin-top', options.legend.orientation === 'top' ? `${legend.height}px` : null)
        .style('margin-left', options.legend.orientation === 'left' ? `${legend.width}px` : null);

    this.g = this.svg.append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    return this;
  }

  update(data, options, dispatchers) {
    this.data = data;
    this.options = options;
    this.type = options.type;
    this.dispatchers = dispatchers;

    this.setWrapperDimensions();

    this.renderLegend();

    this.setSVGMargins();

    let legend;

    this.setSVGHeight();
    this.setSVGWidth();

    const { width, height, margins } = this.getDimensions();

    if (this.legend && this.legend.container) {
      legend = this.legend.container.node().getBoundingClientRect();
    }

    this.wrapper
      .select('svg')
        .attr('width', width + margins.left + margins.right)
        .style('width', `${width + margins.left + margins.right}px`)
        .attr('height', height + margins.top + margins.bottom)
        .style('height', `${height + margins.top + margins.bottom}px`)
        .style('margin-top', options.legend.orientation === 'top' ? `${legend.height}px` : null)
        .style('margin-left', options.legend.orientation === 'left' ? `${legend.width}px` : null)
      .select('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);
  }
}

export default Container;
