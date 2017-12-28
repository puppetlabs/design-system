import { scalePoint, scaleBand, scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import helpers from '../../helpers/charting';

class XScale {
  constructor(categories, options, dimensions) {
    this.categories = categories;
    this.options = options;
    this.dimensions = dimensions;
    this.type = options.type;
    this.scaleType = helpers.detectScaleType(categories);
  }

  generate() {
    const { categories, dimensions, options } = this;
    const { width, height } = dimensions;
    const type = this.type;
    const xAxisOptions = options.axis && options.axis.x ? options.axis.x : {};

    if (type === 'column' || type === 'combination' || xAxisOptions.scaleType === 'ordinalBand') {
      const paddingInner = xAxisOptions.paddingInner || 0.05;
      const paddingOuter = xAxisOptions.paddingOuter || 0.05;

      this.x = scaleBand();
      this.x
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter);

      this.x.domain(categories);
    } else if (this.scaleType === 'ordinal') {
      this.x = scalePoint();

      this.x.padding(xAxisOptions.paddingOuter || 0);

      this.x.domain(categories);
    } else {
      if (this.scaleType === 'date') {
        this.x = scaleTime();
      } else {
        this.x = scaleLinear();
      }

      this.x.domain(extent(categories));
    }

    const orientation = options.axis && options.axis.x ? options.axis.x.orientation : 'bottom';

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
