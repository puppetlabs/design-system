import { select } from 'd3-selection';
import debounce from 'debounce';
import Dispatchers from './lib/Dispatchers';
import IDGenerator from './helpers/IDGenerator';

import AreaChart from './charts/AreaChart';
import LineChart from './charts/LineChart';
import ColumnChart from './charts/ColumnChart';
import DonutChart from './charts/DonutChart';
import GaugeChart from './charts/GaugeChart';
import ScatterChart from './charts/ScatterChart';
import CombinationChart from './charts/CombinationChart';
import SparklineChart from './charts/SparklineChart';
import { VIZ_TYPES } from './constants';

/* eslint-disable */
if (
  window &&
  window.navigator &&
  window.navigator.userAgent &&
  /Edge\/1[0-4]\./.test(window.navigator.userAgent)
) {
  // Fix for bug in Microsoft Edge: https://github.com/Microsoft/ChakraCore/issues/1415#issuecomment-246424339
  Function.prototype.call = function(t) {
    return this.apply(t, Array.prototype.slice.apply(arguments, [1]));
  };
}
/* eslint-enable */

// This ensures uniqueness for the entire instance, which is useful when rendering multiple charts
// on the same page.
const UniqueIDGenerator = new IDGenerator();

const getChart = type => {
  let chart;

  switch (type) {
    case VIZ_TYPES.AREA:
      chart = AreaChart;
      break;
    case VIZ_TYPES.LINE:
      chart = LineChart;
      break;
    case VIZ_TYPES.COLUMN:
      chart = ColumnChart;
      break;
    case VIZ_TYPES.DONUT:
      chart = DonutChart;
      break;
    case VIZ_TYPES.GAUGE:
      chart = GaugeChart;
      break;
    case VIZ_TYPES.SCATTER:
      chart = ScatterChart;
      break;
    case VIZ_TYPES.BUBBLE:
      chart = ScatterChart;
      break;
    case VIZ_TYPES.COMBINATION:
      chart = CombinationChart;
      break;
    case VIZ_TYPES.SPARKLINE:
      chart = SparklineChart;
      break;
    default:
      break;
  }

  return chart;
};

class Chart {
  constructor(elem, { type, data = {}, options = {} }) {
    this.elem = elem;
    this.data = data;
    this.type = type;
    this.dimensions = {};
    this.dispatchers = new Dispatchers();
    this.id = UniqueIDGenerator.getUniqueId();
    this.options = options;

    this.resize = debounce(this.resize.bind(this), 100);

    if (select(elem).size() === 0) {
      throw new Error('Unable to get the element provided');
    } else {
      this.setupEvents(this.options.events);

      const ChartType = getChart(this.type);

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
  }

  on(eventType, callback) {
    this.dispatchers.on(`${eventType}.external`, callback);
  }

  setupEvents(events = {}) {
    Object.keys(events).forEach(type => {
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
        throw e;
      }
    }
  }

  resize() {
    try {
      if (this.rendered && this.chart) {
        this.chart.update();
      }
    } catch (e) {
      if (this.dispatchers.enabled('onError.external')) {
        this.dispatchers.call('onError', this, e);
      } else {
        throw e;
      }
    }
  }

  destroyContainer() {
    // Remove all the children.
    select(this.elem)
      .selectAll('*')
      .remove();
  }

  destroy() {
    this.destroyContainer();

    window.removeEventListener('resize', this.resize);

    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
      delete this.chart;
    }
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
