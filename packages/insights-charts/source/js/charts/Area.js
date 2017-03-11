import Chart from './Chart';

class Area extends Chart {
  constructor(elem, data, options) {
    super(elem, data, options);
  }

  build() {
    console.log('building visualization...');
  }
}

export default Area;
