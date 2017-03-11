import Chart from './Chart';
import * as d3 from 'd3';

class Line extends Chart {
  constructor(elem, data, options) {
    super(elem, data, options);
  }

  build() {
    this.visualization = 'hello world';
  }
}

export default Line;
