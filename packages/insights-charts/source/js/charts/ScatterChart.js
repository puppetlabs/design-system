import deepmerge from 'deepmerge';
import { selectAll } from 'd3-selection';
import Chart from './Chart';
import { XScale, YScale } from '../lib/scales';
import { XAxis, YAxis } from '../lib/axis';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import Grid from '../lib/Grid';
import Tooltip from '../lib/Tooltip';
import SeriesPoi from '../lib/series/SeriesPoi';
import CSS from '../helpers/css';

class ScatterChart extends Chart {
  constructor({ elem, type, data, options, dispatchers }) {
    super({ elem, type, data, options, dispatchers });

    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, this.type, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath({ width: 0, height: dimensions.height }, { enabled: false });
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, dimensions, options, dispatchers);
    this.tooltip.render(wrapper);

    this.xScale = new XScale(categories, options, dimensions, this.type);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categories, x, dimensions, options.axis.x);
    this.xAxis.render(svg);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);

      if (data.length > 0) {
        const yScale = new YScale(data, yOptions, options.layout, dimensions, options);
        const y = yScale.generate();

        // only use the first series for the grid
        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);
        }

        const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
        yAxis.render(svg);

        const plotOptions = this.getPlotOptions(this.type);

        const seriesPoi = new SeriesPoi(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          deepmerge(plotOptions, { animations: { enabled: true } }),
          dispatchers,
          yAxisIndex,
        );

        seriesPoi.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesPoi,
        };
      }
    });

    selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, this.type, dispatchers);
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options, dispatchers);

    const x = this.xScale.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        const plotOptions = this.getPlotOptions(this.type);

        scale.seriesPoi.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          deepmerge(plotOptions, { animations: { enabled: true } }),
          dispatchers,
          yAxisIndex,
        );
      }
    });
  }
}

export default ScatterChart;
