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
    const options = this.options.axis.x;
    const orientation = options.orientation;
    let axis;

    if (orientation === 'left' || orientation === 'right') {
      axis = axisLeft(this.x);
    } else {
      axis = axisBottom(this.x);
    }

    if (options.ticks) {
      axis.ticks(options.ticks);
    }

    return axis;
  }

  renderYGridLines() {
    const options = this.options.axis.y[0];
    const orientation = options.orientation || 'left';
    let axis;

    if (orientation === 'bottom' || orientation === 'top') {
      axis = axisBottom(this.y);
    } else {
      axis = axisLeft(this.y);
    }

    // y axis is always converted to array and we always use the first y axis for the grid
    if (options.ticks) {
      axis.ticks(options.ticks);
    }

    return axis;
  }

  render(elem) {
    const options = this.options.grid;

    if (elem) {
      this.elem = elem;
    }

    if (options.enabled) {
      const { width, height } = this.dimensions;

      this.grid = this.elem.append('g')
        .attr('class', CSS.getClassName('grid'));

      if (options.vertical) {
        const orientation = this.options.axis.x.orientation;
        let translate;
        let tickSize;

        if (orientation === 'left') {
          translate = '0, 0';
          tickSize = -width;
        } else {
          translate = `0, ${height}`;
          tickSize = -height;
        }

        this.verticalGrid = this.grid.append('g')
          .attr('class', CSS.getClassName('grid-vertical'))
          .attr('transform', `translate(${translate})`)
          .call(this.renderXGridLines().tickSize(tickSize).tickFormat(''));
      }

      if (options.horizontal) {
        const orientation = this.options.axis.y[0].orientation || 'left';
        let translate;
        let tickSize;

        if (orientation === 'left') {
          translate = '0, 0';
          tickSize = -width;
        } else {
          translate = `0, ${height}`;
          tickSize = -height;
        }

        this.horizontalGrid = this.grid.append('g')
          .attr('transform', `translate(${translate})`)
          .attr('class', CSS.getClassName('grid-horizontal'))
          .call(this.renderYGridLines().tickSize(tickSize).tickFormat(''));
      }
    }

    if (this.grid) {
      this.grid.lower();
    }

    return this.grid;
  }

  update(x, y, dimensions, options) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.options = options;

    if (this.grid) {
      this.grid.remove();
    }

    this.render();
  }
}

export default Grid;
