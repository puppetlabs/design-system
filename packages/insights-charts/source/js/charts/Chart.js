class Chart {
  constructor({ elem, data, options, dispatchers }) {
    this.elem = elem;
    this.data = data;
    this.options = options;
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
}

export default Chart;
