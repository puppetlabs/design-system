import Visualization from './Visualization';

class Area extends Visualization {
  constructor(elem, data, options) {
    super(elem, data, options);
  }

  build() {
    console.log('building visualization...');
  }
}

export default Area;
