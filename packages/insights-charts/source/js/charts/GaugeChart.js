import deepmerge from 'deepmerge';
import Chart from './Chart';
import Container from '../lib/Container';
import Gauge from '../lib/Gauge';

const chartOptions = {
  margins: {
    static: true,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  axis: {
    x: {
      enabled: false,
    },
    y: {
      enabled: false,
    },
  },
  legend: {
    enabled: false,
  },
};

class GaugeChart extends Chart {
  constructor(props) {
    const revisedProps = props;
    revisedProps.options = deepmerge(chartOptions, props.options || {});

    super(revisedProps);
  }

  render() {
    const seriesData = this.data.getSeries();

    const { dispatchers, options } = this;

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
