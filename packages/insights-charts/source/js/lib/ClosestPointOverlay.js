import { bisector } from 'd3-array';
import { select, mouse } from 'd3-selection';
import CSS from '../helpers/css';

class ClosestPointOverlay {
  constructor(categories, x, dimensions, dispatchers) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;
  }

  bisectCategory() {
    return bisector(d => (d)).left;
  }

  bindEvents() {
    const categories = this.categories;
    const x = this.x;
    const dispatchers = this.dispatchers;
    const self = this;

    this.overlay
      .on('mouseout', () => {
        dispatchers.call('activatePointOfInterest');
        dispatchers.call('tooltipHide');
      })
      .on('mousemove', function () {
        // We want to get the mouse position relative to the POIOverlay to determine the closest
        // category, but we need the mouse position relative to body for the `tooltipMove` event.
        const globalMouse = mouse(select('body').node());
        const localMouse = mouse(this);

        const xPos = localMouse[0];
        let mouseCategory;
        let index;
        let categoryIndex;
        let category;
        let lowerIndex;

        // Handle numeric and date scales
        if (x.invert) {
          mouseCategory = x.invert(xPos);
          index = self.bisectCategory()(categories, mouseCategory);

          lowerIndex = index - 1;

          // Handle furthest left, by using the first category.
          if (lowerIndex < 0) lowerIndex = 0;

          const d0 = categories[lowerIndex];
          const d1 = categories[index];

          // work out which category is closest to the mouse
          if (mouseCategory - d0 > d1 - mouseCategory) {
            categoryIndex = index;
            category = d1;
          } else {
            categoryIndex = lowerIndex;
            category = d0;
          }
        } else {
          // Handle ordinal scales here. We need an extra step to map the mouse position to
          // the x scale.
          const values = categories.map(c => (x(c)));

          index = self.bisectCategory()(values, xPos);

          lowerIndex = index - 1;

          // Handle furthest left, by using the first category.
          if (lowerIndex < 0) lowerIndex = 0;

          const d0 = values[lowerIndex];
          const d1 = values[index];

          if (xPos - d0 > d1 - xPos) {
            categoryIndex = index;
          } else {
            categoryIndex = lowerIndex;
          }

          category = categories[categoryIndex];
        }

        dispatchers.call('activatePointOfInterest', this, category);
        dispatchers.call('tooltipMove', this, categoryIndex, 0, category, globalMouse);
      });
  }

  render(elem) {
    const { width, height } = this.dimensions;

    this.overlay = elem.append('rect')
      .attr('class', CSS.getClassName('overlay'))
      .attr('width', width)
      .attr('height', height);

    this.bindEvents();

    return this.overlay;
  }

  update(categories, x, dimensions, dispatchers) {
    this.categories = categories;
    this.x = x;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;

    this.overlay
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    this.bindEvents();
  }
}

export default ClosestPointOverlay;
