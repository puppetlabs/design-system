import Chart from './Chart';
import Container from '../lib/Container';
import Gauge from '../lib/Gauge';

class GaugeChart extends Chart {
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

    this.gauge = new Gauge(seriesData, options, dimensions, dispatchers);
    this.gauge.render(svg);
  }

  update() {
    const seriesData = this.data.getSeries();
    const { options, dispatchers } = this;

    this.container.update(this.data, options, dispatchers);
    const dimensions = this.container.getDimensions();

    this.gauge.update(seriesData, options, dimensions, dispatchers);
  }
}

export default GaugeChart;
