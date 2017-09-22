import Chart from './Chart';
import Container from '../lib/Container';
import Tooltip from '../lib/Tooltip';
import Donut from '../lib/Donut';

class DonutChart extends Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    super({ elem, type, data, options, dispatchers, id });
  }

  render() {
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.tooltip = new Tooltip(seriesData, options, dispatchers, this.id);
    this.tooltip.render();

    this.donut = new Donut(seriesData, options, dimensions, dispatchers);
    this.donut.render(svg);
  }

  update() {
    const seriesData = this.data.getSeries();
    const { options, dispatchers } = this;

    this.container.update(this.data, options, dispatchers);
    const dimensions = this.container.getDimensions();

    this.tooltip.update(seriesData, options, dispatchers, this.id);

    this.donut.update(seriesData, options, dimensions, dispatchers);
  }

  destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }
}

export default DonutChart;
