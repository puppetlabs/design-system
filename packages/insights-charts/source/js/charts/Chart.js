import clone from 'clone';
import DataSet from '../lib/DataSet';

class Chart {
  constructor({ elem, type, data, options, dispatchers }) {
    this.elem = elem;
    this.type = type;
    this.options = clone(options);
    this.data = new DataSet(data, this.options, type);
    this.dispatchers = dispatchers;

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

  getPlotOptions(type) {
    return this.options[type] || {};
  }
}

export default Chart;
