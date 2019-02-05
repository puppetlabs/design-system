import { scalePoint, scaleBand, scaleTime, scaleLinear } from 'd3-scale';
import { extent, min as d3Min, max as d3Max } from 'd3-array';
import helpers from '../../helpers/charting';
import { VIZ_TYPES } from '../../constants';

class XScale {
  constructor(categories, options, dimensions, data) {
    this.categories = categories;
    this.options = options;
    this.dimensions = dimensions;
    this.type = options.type;
    this.scaleType = helpers.detectScaleType(categories);
    this.data = data;
  }

  getMinimum(data) {
    return d3Min(data, s => {
      const isBubble = s.type === VIZ_TYPES.BUBBLE;
      let min;

      const props = {
        data: this.data,
        s,
        axis: 'x',
        limitType: 'min',
        dimensions: this.dimensions,
        options: this.options,
      };

      if (isBubble) {
        min = helpers.getAdjustedLimit(props);
      }

      return min;
    });
  }

  getMaximum(data) {
    return d3Max(data, s => {
      const isBubble = s.type === VIZ_TYPES.BUBBLE;
      let max;

      const props = {
        data: this.data,
        s,
        axis: 'x',
        limitType: 'max',
        dimensions: this.dimensions,
        options: this.options,
      };

      if (isBubble) {
        max = helpers.getAdjustedLimit(props);
      }

      return max;
    });
  }

  generate() {
    const { categories, dimensions, options, data } = this;
    const { width, height } = dimensions;
    const { type } = this;
    const xAxisOptions = options.axis && options.axis.x ? options.axis.x : {};

    if (
      type === VIZ_TYPES.COLUMN ||
      type === VIZ_TYPES.COMBINATION ||
      xAxisOptions.scaleType === 'ordinalBand'
    ) {
      const paddingInner = xAxisOptions.paddingInner || 0.05;
      const paddingOuter = xAxisOptions.paddingOuter || 0.05;

      this.x = scaleBand();
      this.x.paddingInner(paddingInner).paddingOuter(paddingOuter);

      this.x.domain(categories);
    } else if (this.scaleType === 'ordinal') {
      this.x = scalePoint();

      this.x.padding(xAxisOptions.paddingOuter || 0);

      this.x.domain(categories);
    } else {
      let domain = extent(categories);

      if (this.scaleType === 'date') {
        this.x = scaleTime();
      } else {
        this.x = scaleLinear();
      }

      // Adjust series min/max to add padding for bubble charts
      if (data) {
        const max = this.getMaximum(data);
        const min = this.getMinimum(data);
        if (max && min) {
          domain = [min, max];
        }
      }

      this.x.domain(domain);
    }

    const orientation =
      options.axis && options.axis.x ? options.axis.x.orientation : 'bottom';

    if (orientation === 'left' || orientation === 'right') {
      this.x.range([0, height]);
    } else {
      this.x.range([0, width]);
    }

    return this.x;
  }

  update(categories, options, dimensions) {
    this.categories = categories;
    this.options = options;
    this.dimensions = dimensions;
    this.type = options.type;
    this.scaleType = helpers.detectScaleType(categories);

    return this.generate();
  }
}

export default XScale;
