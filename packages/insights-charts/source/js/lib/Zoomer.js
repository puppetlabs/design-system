import { bisector, bisectLeft } from 'd3-array';
import { zoom } from 'd3-zoom';
import { select, event, mouse } from 'd3-selection';
import CSS from '../helpers/css';

const ZOOM_RESET_BUTTON_WIDTH = 80;
const ZOOM_RESET_BUTTON_HEIGHT = 20;
const ZOOM_RESET_BUTTON_MARGIN = 10;

function bisectCategoriesLeft() {
  return bisector(c => c.label).left;
}

function getCategoryIndexFromMouse(m, categories, x, horizontal = false) {
  const xPos = horizontal ? m[1] : m[0];

  let mouseCategory;
  let index;
  let categoryIndex;
  let lowerIndex;

  // Handle numeric and date scales
  if (x.invert) {
    mouseCategory = x.invert(xPos);
    index = bisectCategoriesLeft()(categories, mouseCategory);

    lowerIndex = index - 1;

    // Handle furthest left, by using the first category.
    if (lowerIndex < 0) lowerIndex = 0;
    if (index >= categories.length) index = categories.length - 1;

    const d0 = categories[lowerIndex];
    const d1 = categories[index];

    // work out which category is closest to the mouse
    if (mouseCategory - d0.label > d1.label - mouseCategory) {
      categoryIndex = d1.categoryIndex;
    } else {
      categoryIndex = d0.categoryIndex;
    }
  } else {
    // Handle ordinal scales here. We need an extra step to map the mouse position to
    // the x scale.
    const values = categories.map(c => (x(c.label)));

    index = bisectLeft(values, xPos);

    lowerIndex = index - 1;

    // Handle furthest left, by using the first category.
    if (lowerIndex < 0) {
      lowerIndex = 0;
    }
    const bandwidth = x.bandwidth ? x.bandwidth() : 0;
    const centerpoint = bandwidth / 2;

    const d0 = values[lowerIndex] + centerpoint;
    const d1 = values[index] + centerpoint;

    if (xPos - d0 > d1 - xPos) {
      categoryIndex = index;
    } else {
      categoryIndex = lowerIndex;
    }
  }

  return categoryIndex;
}

class Zoomer {
  constructor(categories, x, dimensions, options, dispatchers) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.options = options;
    this.dispatchers = dispatchers;

    this.zoomed = false;
  }

  render(selection) {
    const self = this;
    const { dimensions, options } = this;
    const margins = dimensions.margins;
    const enabled = options.zoom && options.zoom.enabled;
    const resetZoomOffsets = {
      x: (margins.left + dimensions.width) - (ZOOM_RESET_BUTTON_WIDTH + ZOOM_RESET_BUTTON_MARGIN),
      y: margins.top + ZOOM_RESET_BUTTON_MARGIN,
    };
    let isHorizontal = false;
    let zoomer;

    if (
      options &&
      options.axis &&
      options.axis.x &&
      (options.axis.x.orientation === 'left' || options.axis.x.orientation === 'right')) {
      isHorizontal = true;
    }

    if (enabled) {
      if (!this.selection) {
        this.selection = selection;
      }

      if (this.zoomed) {
        const svg = select(this.selection.node().parentNode);
        const reset = svg.select(CSS.getClassSelector('zoomer-reset'));

        // if a reset zoom button already exists don't generate another one
        if (reset.size() === 0) {
          this.resetZoom = svg.append('g')
            .attr('style', 'pointer-events: all; cursor: pointer;')
            .attr('class', CSS.getClassName('zoomer-reset'))
            .on('click', () => {
              self.resetZoom.remove();
              self.zoomed = false;
              self.dispatchers.call('zoom', this, { reset: true });
            });

          this.resetZoom.append('rect')
            .attr('width', ZOOM_RESET_BUTTON_WIDTH)
            .attr('height', ZOOM_RESET_BUTTON_HEIGHT)
            .attr('x', 0)
            .attr('y', 0)
            .attr('rx', 3)
            .attr('ry', 3);

          this.resetZoom.append('text')
            .attr('style', 'pointer-events: none;')
            .attr('x', 14)
            .attr('y', 14)
            .text('zoom out');
        } else {
          this.resetZoom = reset;
        }

        this.resetZoom.attr('transform', `translate(${resetZoomOffsets.x},${resetZoomOffsets.y})`);
      }

      const zoomFunction = zoom()
        .on('start', function () {
          const { categories, x, dispatchers } = self;
          const m = mouse(this);
          const mousePos = isHorizontal ? m[1] : m[0];

          self.zoomMarker = self.selection.append('rect')
            .attr('class', CSS.getClassName('zoomer-marker'));

          if (isHorizontal) {
            self.zoomMarker.attr('y', mousePos)
              .attr('width', dimensions.width);
          } else {
            self.zoomMarker.attr('x', mousePos)
              .attr('height', dimensions.height);
          }

          self.startEvent = event;
          self.startPosition = mousePos;
          self.startingIndex = getCategoryIndexFromMouse(m, categories, x, isHorizontal);

          dispatchers.call('zoomStart', this);
        })
        .on('zoom', function () {
          const m = mouse(this);
          const mousePos = isHorizontal ? m[1] : m[0];
          let x;
          let y;
          let width;
          let height;

          if (isHorizontal) {
            if (mousePos < self.startPosition) {
              y = mousePos;
              height = self.startPosition - y;
            } else {
              y = self.startPosition;
              height = mousePos - y;
            }

            self.zoomMarker
              .attr('y', y)
              .attr('height', Math.abs(height));
          } else {
            if (mousePos < self.startPosition) {
              x = mousePos;
              width = self.startPosition - x;
            } else {
              x = self.startPosition;
              width = mousePos - x;
            }

            self.zoomMarker
              .attr('x', x)
              .attr('width', Math.abs(width));
          }
        })
        .on('end', function () {
          const { dispatchers, categories, x } = self;
          const m = mouse(this);
          let firstCategory;
          let lastCategory;
          self.endEvent = event;

          self.zoomMarker.remove();

          if (self.startEvent.transform.x !== self.endEvent.transform.x) {
            self.zoomed = true;

            self.endingIndex = getCategoryIndexFromMouse(m, categories, x, isHorizontal);

            if (self.endingIndex < self.startingIndex) {
              firstCategory = self.endingIndex;
              lastCategory = self.startingIndex;
            } else {
              firstCategory = self.startingIndex;
              lastCategory = self.endingIndex;
            }

            const zoomedCategories = categories.filter((c, i) => (
              i >= firstCategory && i <= lastCategory
            ));

            const zoomObj = {};

            if (zoomedCategories.length > 0) {
              zoomObj.categories = [firstCategory, lastCategory];
            }

            // zoomed categories are the same as the total number of categories then don't
            // zoom in
            if ((lastCategory - firstCategory) + 1 !== categories.length) {
              dispatchers.call('zoom', this, zoomObj);
            }

            dispatchers.call('zoomEnd', this);
          }
        });

      let zoomerBg = this.selection.select(CSS.getClassSelector('zoomer-bg'));

      if (zoomerBg.size() === 0) {
        zoomerBg = this.selection.append('rect');
      }

      zoomerBg.attr('class', CSS.getClassName('zoomer-bg'))
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

      zoomer = this.selection
          .call(zoomFunction)
          .on('wheel.zoom', null);
    }

    return zoomer;
  }

  update(categories, x, dimensions, options, dispatchers) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.options = options;
    this.dispatchers = dispatchers;

    this.render();
  }
}

export default Zoomer;
