import { axisLeft, axisBottom } from 'd3-axis';
import CSS from '../helpers/css';

class Grid {
  constructor(x, y, dimensions, options) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;
  }

  renderXGridLines() {
    const axis = axisBottom(this.x);

    if (this.options.axis.x.ticks) {
      axis.ticks(this.options.axis.x.ticks);
    }

    return axis;
  }

  renderYGridLines() {
    const axis = axisLeft(this.y);

    // y axis is always converted to array and we always use the first y axis for the grid
    if (this.options.axis.y[0].ticks) {
      axis.ticks(this.options.axis.y[0].ticks);
    }

    return axis;
  }

  render(elem) {
    const options = this.options.grid;

    if (options.enabled) {
      const { width, height } = this.dimensions;

      this.grid = elem.append('g')
        .attr('class', CSS.getClassName('grid'));

      if (options.vertical) {
        this.verticalGrid = this.grid.append('g')
          .attr('class', CSS.getClassName('grid-vertical'))
          .attr('transform', `translate(0, ${height})`)
          .call(this.renderXGridLines().tickSize(-height).tickFormat(''));
      }

      if (options.horizontal) {
        this.horizontalGrid = this.grid.append('g')
          .attr('class', CSS.getClassName('grid-horizontal'))
          .call(this.renderYGridLines().tickSize(-width).tickFormat(''));
      }
    }

    this.grid.lower();

    return this.grid;
  }

  update(x, y, dimensions, options) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;

    const { height, width } = dimensions;

    this.verticalGrid.call(this.renderXGridLines().tickSize(-height).tickFormat(''));
    this.horizontalGrid.call(this.renderYGridLines().tickSize(-width).tickFormat(''));
  }
}

export default Grid;
