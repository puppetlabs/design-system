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

    this.getY = this.getY.bind(this);
    this.getInitialWidth = this.getInitialWidth.bind(this);
    this.getInitialHeight = this.getInitialHeight.bind(this);
    this.getFinalWidth = this.getFinalWidth.bind(this);
    this.getFinalHeight = this.getFinalHeight.bind(this);
  }

  getY() {
    const { options, dimensions } = this;
    const { margins } = dimensions;
    const { clip_path: clipPath } = options;
    let y = 0;

    if (clipPath && clipPath.include_margins) {
      y -= margins.top;
    }

    return y;
  }

  getWidth() {
    const { options, dimensions } = this;
    const { margins } = dimensions;
    const { clip_path: clipPath } = options;
    const { width } = dimensions;
    let newWidth = width;

    if (clipPath && clipPath.include_margins) {
      newWidth += margins.left + margins.right;
    }

    return newWidth;
  }

  getHeight() {
    const { options, dimensions } = this;
    const { margins } = dimensions;
    const { clip_path: clipPath } = options;
    const { height } = dimensions;
    let newHeight = height;

    if (clipPath && clipPath.include_margins) {
      newHeight += margins.top + margins.bottom;
    }

    return newHeight;
  }

  getInitialWidth() {
    const width = this.getWidth();

    return this.direction === VERTICAL ? width : 0;
  }

  getInitialHeight() {
    const height = this.getHeight();

    return this.direction === HORIZONTAL ? height : 0;
  }

  getFinalWidth() {
    return this.getWidth();
  }

  getFinalHeight() {
    return this.getHeight();
  }

  render(elem) {
    const { height } = this.dimensions;

    const clipPath = elem
      .append('defs')
      .append('clipPath')
      .attr('id', this.id);

    this.clipPath = clipPath
      .append('rect')
      .attr('class', CSS.getClassName('clip-path-rect'))
      .attr('width', this.getInitialWidth)
      .attr('height', this.getInitialHeight)
      .attr('y', this.direction === VERTICAL ? height : this.getY());

    return this.clipPath;
  }

  animate(onAnimationEnd = () => {}) {
    const { options } = this;

    if (options.animations && options.animations.enabled) {
      this.clipPath
        .transition()
        .duration(options.animations.duration)
        .on('end', onAnimationEnd)
        .attr('width', this.getFinalWidth)
        .attr('height', this.getFinalHeight)
        .attr('y', this.getY);
    } else {
      this.clipPath
        .attr('width', this.getFinalWidth)
        .attr('height', this.getFinalHeight)
        .attr('y', this.getY);

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
