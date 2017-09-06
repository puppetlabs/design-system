// I guess d3-transition monkeypatches d3-selection, adding the selection.prototype.transition
// method. So we have to import the whole thing.
import 'd3-transition';

import CSS from '../helpers/css';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class ClipPath {
  constructor(dimensions, options, id, direction = HORIZONTAL) {
    this.dimensions = dimensions;
    this.options = options;
    this.id = id;
    this.direction = direction;

    this.getInitialWidth = this.getInitialWidth.bind(this);
    this.getInitialHeight = this.getInitialHeight.bind(this);
    this.getFinalWidth = this.getFinalWidth.bind(this);
    this.getFinalHeight = this.getFinalHeight.bind(this);
  }

  getInitialWidth() {
    const dimensions = this.dimensions;

    return this.direction === VERTICAL ? dimensions.width : 0;
  }

  getInitialHeight() {
    const dimensions = this.dimensions;

    return this.direction === HORIZONTAL ? dimensions.height : 0;
  }

  getFinalWidth() {
    const dimensions = this.dimensions;

    return dimensions.width;
  }

  getFinalHeight() {
    const dimensions = this.dimensions;

    return dimensions.height;
  }

  render(elem) {
    const height = this.dimensions.height;

    const clipPath = elem
      .append('defs')
      .append('clipPath')
        .attr('id', this.id);

    this.clipPath = clipPath.append('rect')
        .attr('class', CSS.getClassName('clip-path-rect'))
        .attr('width', this.getInitialWidth)
        .attr('height', this.getInitialHeight)
        .attr('y', this.direction === VERTICAL ? height : 0);

    return this.clipPath;
  }

  animate(onAnimationEnd = () => {}) {
    const options = this.options;

    if (options.animations && options.animations.enabled) {
      this.clipPath.transition()
        .duration(options.animations.duration)
        .on('end', onAnimationEnd)
        .attr('width', this.getFinalWidth)
        .attr('height', this.getFinalHeight)
        .attr('y', 0);
    } else {
      this.clipPath
        .attr('width', this.getFinalWidth)
        .attr('height', this.getFinalHeight)
        .attr('y', 0);

      onAnimationEnd();
    }
  }

  update(dimensions, options, id, direction = HORIZONTAL) {
    this.dimensions = dimensions;
    this.options = options;
    this.id = id;
    this.direction = direction;

    this.clipPath
      .attr('width', this.getFinalWidth)
      .attr('height', this.getFinalHeight);
  }
}

export default ClipPath;
