import Visualization from './Visualization';

class Line extends Visualization {
  constructor(elem, data, options) {
    super(elem, data, options);
  }

  build() {
    this.visualization = 'hello world';
  }
}

export default Line;
