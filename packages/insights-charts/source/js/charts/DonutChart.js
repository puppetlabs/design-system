import deepmerge from 'deepmerge';
import Chart from './Chart';
import Container from '../lib/Container';
import Tooltip from '../lib/Tooltip';
import Donut from '../lib/Donut';

const chartOptions = {
  margins: {
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
    expanded: true,
  },
};

class DonutChart extends Chart {
  constructor(props) {
    const revisedProps = props;
    revisedProps.options = deepmerge(chartOptions, props.options || {});

    super(revisedProps);
  }

  render() {
    const seriesData = this.data.getSeries();
    const { dispatchers } = this;
    const { options } = this;

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
}

export default DonutChart;
