import * as d3 from 'd3';
import moment from 'moment';

class Visualization {
  constructor(elem, data, options) {
    this.elem = elem;
    this.options = options;

    this.build();
  }

  build() {
    console.log('falling back...');
  }

  render() {
    this.elem.innerHTML = this.visualization;
  }
}

export default Visualization;
