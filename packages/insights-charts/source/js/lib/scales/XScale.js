import { scalePoint, scaleBand, scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import helpers from '../../helpers/charting';

class XScale {
  constructor(categories, options, dimensions, type) {
    this.categories = categories;
    this.options = options;
    this.scale = helpers.detectScaleType(categories, type);
    this.dimensions = dimensions;
    this.type = type;
  }

  generate() {
    const categories = this.categories;
    const width = this.dimensions.width;
    const type = this.type;

    // If the domain is all strings we'll use an ordinal type instead of a
    // linear one.
    if (this.scale === 'ordinal') {
      if (type === 'column' || type === 'bar') {
        this.x = scaleBand()
          .padding(0.05)
          .range([0, width]);
      } else {
        this.x = scalePoint()
          .range([0, width]);
      }

      this.x.domain(categories);
    } else {
      if (this.scale === 'time') {
        this.x = scaleTime();
        this.x.range([0, width]);
      } else {
        this.x = scaleLinear();
        this.x.rangeRound([0, width]);
      }

      this.x.domain(extent(categories));
    }

    return this.x;
  }

  update(categories, options, dimensions, type) {
    this.categories = categories;
    this.options = options;
    this.dimensions = dimensions;
    this.type = type;

    return this.generate();
  }
}

export default XScale;
