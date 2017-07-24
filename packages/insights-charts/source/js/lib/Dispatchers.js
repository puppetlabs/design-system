import { dispatch } from 'd3-dispatch';

class Dispatchers {
  constructor() {
    this.dispatchers = dispatch(
      'beforeRender',
      'afterRender',
      'update',
      'dataPointClick',
      'legendItemClick',
      'highlightSeries',
      'unHighlightSeries',
      'activatePointOfInterest',
      'tooltipMove',
      'tooltipHide',
      'annotationClick',
    );
  }

  on(...args) {
    this.dispatchers.on(...args);
  }

  enabled(type) {
    return !!this.dispatchers.on(type);
  }

  call(...args) {
    this.dispatchers.call(...args);
  }
}

export default Dispatchers;
