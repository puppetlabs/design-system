import clone from 'clone';
import { select } from 'd3-selection';
import Legend from './Legend';
import CSS from '../helpers/css';
import XScale from './scales/XScale';
import YScale from './scales/YScale';
import XAxis from './axis/XAxis';
import YAxis from './axis/YAxis';

class Container {
  constructor(data, options, type, dispatchers) {
    this.data = data;
    this.options = options;
    this.type = type;
    this.dispatchers = dispatchers;
    this.dimensions = {
      width: options.width,
      height: options.height,
      defaultMargins: clone(options.margins), // these do not get modified by our code
      margins: options.margins, // these get modified to allow space for axis widths
    };
  }

  getDimensions() {
    const { top, left, width, height, margins, defaultMargins } = this.dimensions;

    return {
      top,
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
    const { top, left, width, height } = this.elem.getBoundingClientRect();

    this.dimensions.top = top;
    this.dimensions.left = left;
    this.dimensions.width = width;
    this.dimensions.height = height;
  }

  setSVGMargins() {
    if (this.type !== 'sparkline') {
      const options = this.options;
      const dimensions = this.getDimensions();
      const elem = this.elem;
      const categories = this.data.getCategories();
      const testSVG = select(elem).append('svg');

      const xScale = new XScale(categories, options, dimensions, this.type);
      const x = xScale.generate();

      const xAxis = new XAxis(categories, x, dimensions, options.axis.x);
      const tempX = xAxis.render(testSVG);

      const xAxisHeight = tempX.node().getBBox().height;
      this.dimensions.margins.bottom = xAxisHeight + dimensions.defaultMargins.bottom;

      options.axis.y.forEach((yOptions, yAxisIndex) => {
        if (yOptions.enabled !== false) {
          const data = this.data.getDataByYAxis(yAxisIndex);

          if (data.length > 0) {
            const yScale = new YScale(data, yOptions, options.layout, dimensions, options);
            const y = yScale.generate();

            const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
            const axis = yAxis.render(testSVG);

            const yAxisWidth = axis.node().getBBox().width;

            // TODO: This is currently assuming there is only 1 left axis and 1 right axis
            // We haven't found a use case for more than 1 axis with the same orientation yet
            // If we do this will need to be updated.
            if (!yOptions.orientation || yOptions.orientation === 'left') {
              this.dimensions.margins.left = yAxisWidth + dimensions.defaultMargins.left;
            } else {
              this.dimensions.margins.right = yAxisWidth + dimensions.defaultMargins.right;
            }
          }
        }
      });

      testSVG.remove();
    }
  }

  setSVGHeight() {
    const { options, legend } = this;
    const { height, margins } = this.getDimensions();
    let newHeight = height - margins.top - margins.bottom;

    if (legend && (options.legend.position === 'top' || options.legend.position === 'bottom')) {
      const rect = legend.node().getBoundingClientRect();

      if (rect && rect.height) {
        newHeight -= rect.height;
      }
    }

    this.dimensions.height = newHeight;
  }

  setSVGWidth() {
    const { options, legend } = this;
    const { width, margins } = this.getDimensions();
    let newWidth = width - margins.left - margins.right;

    if (legend && (options.legend.position === 'left' || options.legend.position === 'right')) {
      const rect = legend.node().getBoundingClientRect();

      if (rect && rect.width) {
        newWidth -= rect.width;
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
    this.renderLegend();

    this.setSVGMargins();
    this.setSVGHeight();
    this.setSVGWidth();

    this.renderSVG();
  }

  renderWrapper(elem) {
    this.wrapper = select(elem)
      .append('div')
        .attr('class', CSS.getClassName('wrapper', this.type));
  }

  renderLegend() {
    if (this.type !== 'sparkline') {
      const { wrapper, data, options, dispatchers } = this;
      const legendOptions = options.legend;
      const margins = options.margins;
      const seriesData = data.getSeries();

      // Since donut only supports one series... always expand it.
      if (this.type === 'donut') {
        legendOptions.expanded = true;
      }

      const { legend } = new Legend(wrapper, seriesData, legendOptions, margins, dispatchers);

      this.legend = legend;
    }
  }

  renderSVG() {
    const { width, height, margins } = this.getDimensions();

    this.svg = this.wrapper
      .append('svg')
        .attr('class', CSS.getClassName('svg'))
        .attr('width', width + margins.left + margins.right)
        .attr('height', height + margins.top + margins.bottom)
      .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

    return this;
  }

  update(data, options, type, dispatchers) {
    this.data = data;
    this.options = options;
    this.type = type;
    this.dispatchers = dispatchers;

    this.setWrapperDimensions();

    this.setSVGMargins();
    this.setSVGHeight();
    this.setSVGWidth();

    const { width, height, margins } = this.getDimensions();

    this.wrapper.select('svg')
      .attr('width', width + margins.left + margins.right)
      .attr('height', height + margins.top + margins.bottom);
  }
}

export default Container;