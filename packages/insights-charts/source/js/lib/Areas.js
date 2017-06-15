import CSS from '../helpers/css';
import Area from '../shapes/Area';

class Areas {
  constructor(x, y, options, dimensions) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;
  }

  render(selection) {
    const { x, y, options, dimensions } = this;

    if (!this.selection) {
      this.selection = selection;
    }

    const area = selection
      .append('path')
      .attr('style', d => (d.color ? `fill: ${d.color};` : null))
      .attr('class', CSS.getClassName('area-path'))
      .attr('d', d => (Area(x, y, d.data, dimensions, options)));

    return area;
  }
}

export default Areas;
