import { scaleLinear } from 'd3-scale';
import { min as d3Min, max as d3Max } from 'd3-array';
import helpers from '../../helpers/charting';
import { VIZ_TYPES } from '../../constants';

const getStackedMinimum = data => {
  let min;

  min = d3Min(data, s =>
    d3Min(s.data, d => (d.y || 0) + (d.y0 > 0 ? 0 : d.y0)),
  );

  if (min > 0) {
    min = 0;
  }

  return min;
};

const getStackedMaximum = data =>
  d3Max(data, s => d3Max(s.data, d => (d.y || 0) + (d.y0 < 0 ? 0 : d.y0)));

class YScale {
  constructor(
    data,
    options = {},
    layout,
    dimensions = {},
    allOptions = {},
    type = 'chart',
  ) {
    this.data = data;
    this.options = options;
    this.layout = layout;
    this.dimensions = dimensions;
    this.allOptions = allOptions;
    this.type = type;
  }

  getMinimum(data) {
    return d3Min(data, s => {
      const isBubble = s.type === VIZ_TYPES.BUBBLE;
      const isChart = this.type === 'chart';
      let min;

      const props = {
        data: this.data,
        s,
        axis: 'y',
        limitType: 'min',
        dimensions: this.dimensions,
        options: this.options,
      };

      if (isBubble && isChart) {
        min = helpers.getAdjustedLimit(props);
      } else {
        min = d3Min(s.data.filter(d => d.y !== null), d => d.y);
      }

      return min;
    });
  }

  getMaximum(data) {
    return d3Max(data, s => {
      const isBubble = s.type === VIZ_TYPES.BUBBLE;
      const isChart = this.type === 'chart';
      let max;

      const props = {
        data: this.data,
        s,
        axis: 'y',
        limitType: 'max',
        dimensions: this.dimensions,
        options: this.options,
      };

      if (isBubble && isChart) {
        max = helpers.getAdjustedLimit(props);
      } else {
        max = d3Max(s.data.filter(d => d.y !== null), d => d.y);
      }

      return max;
    });
  }

  generate() {
    const { data, options, dimensions } = this;
    const { width, height } = dimensions;
    const y = scaleLinear();
    const minOption = options.min;
    const maxOption = options.max;
    const multiSeries = data.length > 1;

    let isBubble;
    if (Array.isArray(data)) {
      data.forEach(series => {
        if (series.type === VIZ_TYPES.BUBBLE) {
          isBubble = true;
        }
      });
    } else if (data.type) {
      isBubble = data.type === VIZ_TYPES.BUBBLE;
    }

    const types = {};
    let { layout } = this;
    let max;
    let min;
    let minScale;

    if (multiSeries) {
      this.data.forEach(d => {
        if (!types[d.type]) {
          types[d.type] = [];
        }

        types[d.type].push(d);
      });

      const typeKeys = Object.keys(types);

      if (typeKeys.length > 1) {
        layout = 'mixed';
      } else if (
        typeKeys.length === 1 &&
        this.allOptions &&
        this.allOptions[typeKeys[0]]
      ) {
        ({ layout } = this.allOptions[typeKeys[0]]);
      }
    }

    if (maxOption) {
      max = maxOption;
    } else if (layout === 'stacked' && !isBubble && multiSeries) {
      max = getStackedMaximum(this.data);
    } else if (layout === 'mixed') {
      const chartOptions = this.allOptions || {};
      const maxArray = [];

      Object.keys(types).forEach(type => {
        if (chartOptions[type] && chartOptions[type].layout === 'stacked') {
          maxArray.push(getStackedMaximum(types[type]));
        } else {
          maxArray.push(this.getMaximum(types[type]));
        }
      });

      max = d3Max(maxArray);
    } else {
      max = this.getMaximum(this.data);
    }

    if (minOption !== undefined) {
      min = minOption;
    } else if (layout === 'stacked' && !isBubble) {
      min = getStackedMinimum(this.data);
    } else if (layout === 'mixed') {
      const chartOptions = this.allOptions || {};
      const minArray = [];

      Object.keys(types).forEach(type => {
        if (chartOptions[type] && chartOptions[type].layout === 'stacked') {
          minArray.push(getStackedMinimum(types[type]));
        } else {
          minArray.push(this.getMinimum(types[type]));
        }
      });

      min = d3Min(minArray);
    } else {
      min = this.getMinimum(this.data);
    }

    if (minOption === undefined) {
      minScale = min > 0 ? 0.3 : 1;

      min *= minScale;
    }

    if (options.reversed) {
      y.domain([max, min]);
    } else {
      y.domain([min, max]);
    }

    if (options.orientation === 'bottom' || options.orientation === 'top') {
      y.range([0, width]);
    } else {
      y.range([height, 0]);
    }

    y.nice();

    return y;
  }

  update(data, options, layout, dimensions, allOptions) {
    this.data = data;
    this.options = options;
    this.dimensions = dimensions;
    this.allOptions = allOptions;

    return this.generate();
  }
}

export default YScale;
