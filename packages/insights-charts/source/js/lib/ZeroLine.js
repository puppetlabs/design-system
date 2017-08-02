import { axisLeft, axisBottom } from 'd3-axis';
import CSS from '../helpers/css';

class ZeroLine {
  constructor(x, y, dimensions, options) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;
  }

  render(selection) {
    const { x, y, options } = this;

    if (selection) {
      this.selection = selection;
    }

    if (y.domain()[0] < 0 && y.domain()[1] > 0) {
      let zeroLineAxis;
      let translate;

      if (options.axis.x.orientation === 'left' || options.axis.x.orientation === 'right') {
        zeroLineAxis = axisLeft(x);
        translate = `${y(0)},0`;
      } else {
        zeroLineAxis = axisBottom(x);
        translate = `0,${y(0)}`;
      }

      zeroLineAxis
        .tickValues([])
        .tickSizeOuter(0);

      this.zeroLine = this.selection
        .append('g')
          .attr('class', CSS.getClassName('zero-line'))
          .attr('transform', `translate(${translate})`)
        .call(zeroLineAxis);
    }

    return this.zeroLine;
  }

  update(x, y, dimensions, options) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;

    if (this.zeroLine) {
      this.zeroLine.remove();
    }

    this.render();
  }
}

export default ZeroLine;
