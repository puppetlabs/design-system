// I guess d3-transition monkeypatches d3-selection, adding the selection.prototype.transition
// method. So we have to import the whole thing.
import 'd3-transition';

import { CLIP_PATH_PADDING } from '../constants';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class ClipPath {
  constructor(dimensions, options, id) {
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.options = options;
    this.direction = this.options.direction || HORIZONTAL;
    this.id = id;

    this.getY = this.getY.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
  }

  getWidth() {
    let width = 0;

    if (this.direction === VERTICAL) {
      width = this.width + (CLIP_PATH_PADDING * 2);
    }

    return width;
  }

  getHeight() {
    let height = 0;

    if (this.direction === HORIZONTAL) {
      height = this.height + (CLIP_PATH_PADDING * 2);
    }

    return height;
  }

  getY() {
    let y = 0;

    if (this.direction === VERTICAL) {
      y = this.height;
    }

    return y;
  }

  render(elem) {
    this.clipPath = elem
      .append('defs')
      .append('clipPath')
        .attr('id', this.id)
      .append('rect')
        .attr('x', -CLIP_PATH_PADDING)
        .attr('width', this.getWidth)
        .attr('height', this.getHeight)
        .attr('y', this.getY);

    return this.clipPath;
  }

  animate(dimensions) {
    const options = this.options;

    if (options.enabled) {
      this.clipPath.transition()
        .duration(options.duration)
        .attr('width', dimensions.width + (CLIP_PATH_PADDING * 2))
        .attr('height', dimensions.height + (CLIP_PATH_PADDING * 2))
        .attr('y', -CLIP_PATH_PADDING);
    } else {
      this.clipPath
        .attr('width', dimensions.width + (CLIP_PATH_PADDING * 2))
        .attr('height', dimensions.height + (CLIP_PATH_PADDING * 2))
        .attr('y', -CLIP_PATH_PADDING);
    }
  }

  update(dimensions) {
    this.clipPath
      .attr('width', dimensions.width + (CLIP_PATH_PADDING * 2))
      .attr('height', dimensions.height + (CLIP_PATH_PADDING * 2));
  }
}

export default ClipPath;
