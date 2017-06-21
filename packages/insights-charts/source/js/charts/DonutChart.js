import Chart from './Chart';
import Container from '../lib/Container';
import Tooltip from '../lib/Tooltip';
import Donut from '../lib/Donut';

class DonutChart extends Chart {
  constructor({ elem, type, data, options, dispatchers }) {
    super({ elem, type, data, options, dispatchers });
  }

  render() {
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, this.type, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    options.tooltips.expanded = true;
    this.tooltip = new Tooltip(seriesData, dimensions, options, dispatchers);
    this.tooltip.render(wrapper);

    this.donut = new Donut(seriesData, options, dimensions, dispatchers);
    this.donut.render(svg);
  }

  update() {
    const seriesData = this.data.getSeries();
    const { options, dispatchers } = this;

    this.container.update(this.data, options, this.type, dispatchers);
    const dimensions = this.container.getDimensions();

    this.tooltip.update(seriesData, dimensions, options, dispatchers);

    this.donut.update(seriesData, options, dimensions, dispatchers);
  }
}

export default DonutChart;
