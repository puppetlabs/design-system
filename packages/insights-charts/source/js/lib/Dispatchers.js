import { dispatch } from 'd3-dispatch';

class Dispatchers {
  constructor() {
    this.dispatchers = dispatch(
      'update',
      'legendItemClick',
      'highlightSeries',
      'unHighlightSeries',
      'activatePointOfInterest',
      'tooltipMove',
      'tooltipHide',
    );
  }

  on(...args) {
    this.dispatchers.on(...args);
  }

  call(...args) {
    this.dispatchers.call(...args);
  }
}

export default Dispatchers;
