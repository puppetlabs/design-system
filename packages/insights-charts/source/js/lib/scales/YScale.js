import { scaleLinear } from 'd3-scale';
import { min as d3Min, max as d3Max } from 'd3-array';

class YScale {
  constructor(seriesData, options = {}, layout, dimensions = {}) {
    this.seriesData = seriesData;
    this.options = options;
    this.layout = layout;
    this.dimensions = dimensions;
  }

  generate() {
    const { seriesData, options, layout, dimensions } = this;
    const y = scaleLinear();
    const height = dimensions.height;
    const minOption = options.min;
    const maxOption = options.max;
    const multiSeries = seriesData.length > 1;
    let max;
    let min;
    let scale;

    if (minOption !== undefined) {
      min = minOption;
    } else if (layout === 'stacked' && multiSeries) {
      min = d3Min(seriesData, s => (
        d3Min(s.data, d => (d.y + ((d.y0 > 0) ? 0 : d.y0)))
      ));

      if (min > 0) {
        min = 0;
      }
    } else {
      min = d3Min(seriesData, s => (
        d3Min(s.data, d => (d.y))
      ));
    }

    if (maxOption) {
      max = maxOption;
    } else if (layout === 'stacked' && multiSeries) {
      max = d3Max(seriesData, s => (
        d3Max(s.data, d => (
          d.y + ((d.y0 < 0) ? 0 : d.y0)
        ))
      ));
    } else {
      max = d3Max(seriesData, s => (
        d3Max(s.data, d => (d.y))
      ));
    }

    if (minOption === undefined) {
      // This gives some padding to the scale so that you can still see the minimum value
      scale = (min > 0 ? 0.95 : 1.05);
      min *= scale;
    }

    y.domain([min, max]);
    y.range([height, 0]);

    return y;
  }

  update(seriesData, options, layout, dimensions) {
    this.seriesData = seriesData;
    this.options = options;
    this.dimensions = dimensions;

    return this.generate();
  }
}

export default YScale;
