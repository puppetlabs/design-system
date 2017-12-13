import { scaleLinear } from 'd3-scale';
import { min as d3Min, max as d3Max } from 'd3-array';

class YScale {
  constructor(data, options = {}, layout, dimensions = {}, allOptions = {}) {
    this.data = data;
    this.options = options;
    this.layout = layout;
    this.dimensions = dimensions;
    this.allOptions = allOptions;
  }

  getMinimum(data) {
    return d3Min(data, s => (
      d3Min(s.data.filter(d => d.y !== null), d => d.y)
    ));
  }

  getMaximum(data) {
    return d3Max(data, s => (
      d3Max(s.data.filter(d => d.y !== null), d => d.y)
    ));
  }

  getStackedMinimum(data) {
    let min;

    min = d3Min(data, s => (
      d3Min(s.data, d => ((d.y || 0) + ((d.y0 > 0) ? 0 : d.y0)))
    ));

    if (min > 0) {
      min = 0;
    }

    return min;
  }

  getStackedMaximum(data) {
    return d3Max(data, s => (
      d3Max(s.data, d => (
        (d.y || 0) + ((d.y0 < 0) ? 0 : d.y0)
      ))
    ));
  }

  generate() {
    const { data, options, dimensions } = this;
    const { width, height } = dimensions;
    const y = scaleLinear();
    const minOption = options.min;
    const maxOption = options.max;
    const multiSeries = data.length > 1;
    const types = {};
    let layout = this.layout;
    let max;
    let min;
    let minScale;

    if (multiSeries) {
      this.data.forEach((d) => {
        if (!types[d.type]) {
          types[d.type] = [];
        }

        types[d.type].push(d);
      });

      const typeKeys = Object.keys(types);

      if (typeKeys.length > 1) {
        layout = 'mixed';
      } else if (typeKeys.length === 1 && this.allOptions && this.allOptions[typeKeys[0]]) {
        layout = this.allOptions[typeKeys[0]].layout;
      }
    }

    if (minOption !== undefined) {
      min = minOption;
    } else if (layout === 'stacked') {
      min = this.getStackedMinimum(this.data);
    } else if (layout === 'mixed') {
      const chartOptions = this.allOptions || {};
      const minArray = [];

      Object.keys(types).forEach((type) => {
        if (chartOptions[type] && chartOptions[type].layout === 'stacked') {
          minArray.push(this.getStackedMinimum(types[type]));
        } else {
          minArray.push(this.getMinimum(types[type]));
        }
      });

      min = d3Min(minArray);
    } else {
      min = this.getMinimum(this.data);
    }

    if (maxOption) {
      max = maxOption;
    } else if (layout === 'stacked' && multiSeries) {
      max = this.getStackedMaximum(this.data);
    } else if (layout === 'mixed') {
      const chartOptions = this.allOptions || {};
      const maxArray = [];

      Object.keys(types).forEach((type) => {
        if (chartOptions[type] && chartOptions[type].layout === 'stacked') {
          maxArray.push(this.getStackedMaximum(types[type]));
        } else {
          maxArray.push(this.getMaximum(types[type]));
        }
      });

      max = d3Max(maxArray);
    } else {
      max = this.getMaximum(this.data);
    }

    if (minOption === undefined) {
      minScale = (min > 0 ? 0.3 : 1);

      min *= minScale;
    }

    if (maxOption === undefined) {
      max /= 0.95;
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
