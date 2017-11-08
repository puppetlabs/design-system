import { select } from 'd3-selection';
import clone from 'clone';
import deepmerge from 'deepmerge';
import Dispatchers from '../lib/Dispatchers';
import IDGenerator from '../helpers/IDGenerator';

import AreaChart from './AreaChart';
import LineChart from './LineChart';
import ColumnChart from './ColumnChart';
import DonutChart from './DonutChart';
import ScatterChart from './ScatterChart';
import CombinationChart from './CombinationChart';
import SparklineChart from './SparklineChart';

const defaultOptions = {

  // Settings specific to chart animation.
  animations: {
    enabled: true,

    // How long the animations should take to render.
    duration: 1000,
  },

  // Settings for the margin between the graph and the element.
  margins: {
    static: false,
    top: 10,
    right: 20,
    bottom: 0,
    left: 0,
  },

  // Settings for the axis.
  axis: {
    // Settings for the X axis.
    x: {
      // Toggle rendering the x-axis on the graph.
      enabled: true,

      // Orientation of the labels (either "top" or "bottom").
      orientation: 'bottom',
    },

    // Settings for the Y axis.
    y: {
      // Toggle rendering the y-axis on the graph.
      enabled: true,

      // The orientation of the lables (either "left" or "right").
      orientation: 'left',
    },
  },

  // Properties for legend placement.
  legend: {
    // Should we display the legend?.
    enabled: true,

    // What side to render the legend on.
    orientation: 'right',

    // What text alignment would you like?
    alignment: 'left',
  },

  // Settings specific to tooltips.
  tooltips: {
    // Indicates whether or not tooltips should be enabled.
    enabled: true,
  },

  grid: {
    enabled: false,
    horizontal: true,
    vertical: true,
  },
};

// This ensures uniqueness for the entire instance, which is useful when rendering multiple charts
// on the same page.
const UniqueIDGenerator = new IDGenerator();

class Chart {
  constructor(elem, { type, data = {}, options = {} }) {
    this.elem = elem;
    this.data = data;
    this.type = type;
    this.dimensions = {};
    this.dispatchers = new Dispatchers();
    this.id = UniqueIDGenerator.getUniqueId();

    this.resize = this.resize.bind(this);

    if (select(elem).size() === 0) {
      throw new Error('Unable to get the element provided');
    }

    defaultOptions.width = this.dimensions.width;
    defaultOptions.height = this.dimensions.height;

    // Deep deref defaultOptions
    const clonedDefaults = clone(defaultOptions);
    this.options = deepmerge(clonedDefaults, options);

    if (!Array.isArray(this.options.axis.y)) {
      this.options.axis.y = [this.options.axis.y];
    }

    this.setupEvents(options.events);

    const ChartType = this.getChart();

    this.beforeRender();

    this.chart = new ChartType({
      type,
      id: this.id,
      elem: this.elem,
      data: this.data,
      options: this.options,
      dispatchers: this.dispatchers,
    });

    window.addEventListener('resize', this.resize);
  }

  on(eventType, callback) {
    this.dispatchers.on(`${eventType}.external`, callback);
  }

  setupEvents(events = {}) {
    Object.keys(events).forEach((type) => {
      const callback = events[type];

      this.on(type, callback);
    });
  }

  render() {
    try {
      this.chart.render();

      this.afterRender();
    } catch (e) {
      if (this.dispatchers.enabled('onError.external')) {
        this.dispatchers.call('onError', this, e);
      } else {
        throw (e);
      }
    }
  }

  resize() {
    try {
      if (this.rendered) {
        this.chart.update();
      }
    } catch (e) {
      if (this.dispatchers.enabled('onError.external')) {
        this.dispatchers.call('onError', this, e);
      } else {
        throw (e);
      }
    }
  }

  destroyContainer() {
    // Remove all the children.
    select(this.elem).selectAll('*').remove();
  }

  destroy() {
    this.destroyContainer();

    window.removeEventListener('resize', this.resize);

    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }
  }

  getChart() {
    const type = this.type;
    let chart;

    switch (type) {
      case 'area':
        chart = AreaChart;
        break;
      case 'line':
        chart = LineChart;
        break;
      case 'column':
        chart = ColumnChart;
        break;
      case 'donut':
        chart = DonutChart;
        break;
      case 'scatter':
        chart = ScatterChart;
        break;
      case 'combination':
        chart = CombinationChart;
        break;
      case 'sparkline':
        chart = SparklineChart;
        break;
      default:
        break;
    }

    return chart;
  }

  beforeRender() {
    this.dispatchers.call('beforeRender');
  }

  afterRender() {
    this.rendered = true;

    this.dispatchers.call('afterRender');
  }
}

export default Chart;
