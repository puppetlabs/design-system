import clone from 'clone';
import helpers from '../helpers/charting';
import DataSet from '../lib/DataSet';

class Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    this.elem = elem;
    this.type = type;
    this.options = clone(options);
    this.options.type = type;
    this.data = new DataSet(data, this.options, type);
    this.dispatchers = dispatchers;
    this.id = id;

    if (!this.render) {
      throw new Error('All charts require a render method for rendering the chart');
    }

    if (!this.update) {
      throw new Error('All charts require an update method for resizing and updating the chart');
    } else {
      this.update = this.update.bind(this);
      this.dispatchers.on('update', this.update);
    }
  }

  getPlotOptions(type, data) {
    return helpers.getPlotOptions(type, this.options, data);
  }
}

export default Chart;
