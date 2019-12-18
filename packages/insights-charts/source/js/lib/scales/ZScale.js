import { scalePow } from 'd3-scale';
import { min as d3Min, max as d3Max } from 'd3-array';
import { POI_RADIUS } from '../../constants';
/* eslint-disable import/no-cycle */
import helpers from '../../helpers/charting';

const getMinimum = data =>
  d3Min(data, s =>
    d3Min(
      s.data.filter(d => d.z !== null),
      d => d.z,
    ),
  );

const getMaximum = data =>
  d3Max(data, s =>
    d3Max(
      s.data.filter(d => d.z !== null),
      d => d.z,
    ),
  );

class ZScale {
  constructor(data, dimensions) {
    this.data = data;
    this.dimensions = dimensions;
  }

  generate() {
    const { data, dimensions } = this;
    const z = scalePow().exponent(0.5);
    const relativeAxisLength = Math.min(dimensions.width, dimensions.height);
    const max = getMaximum(data) * relativeAxisLength;
    const min = getMinimum(data) * relativeAxisLength;
    const maxBubbleRadius = helpers.getMaxBubbleRadius(data);

    z.domain([min, max]);
    z.range([POI_RADIUS, maxBubbleRadius]);

    return z;
  }

  update(data, dimensions) {
    this.data = data;
    this.dimensions = dimensions;

    return this.generate();
  }
}

export default ZScale;
