import deepmerge from 'deepmerge';
import Chart from './Chart';
import { XScale, YScale } from '../lib/scales';
import { XAxis, YAxis } from '../lib/axis';
import Annotations from '../lib/Annotations';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import Grid from '../lib/Grid';
import ZeroLine from '../lib/ZeroLine';
import ClosestPointOverlay from '../lib/ClosestPointOverlay';
import Tooltip from '../lib/Tooltip';
import SeriesLine from '../lib/series/SeriesLine';
import SeriesPoi from '../lib/series/SeriesPoi';
import SeriesDataLabel from '../lib/series/SeriesDataLabel';
import CSS from '../helpers/css';

class LineChart extends Chart {
  constructor({ elem, type, data, options, dispatchers }) {
    super({ elem, type, data, options, dispatchers });

    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath({ width: 0, height: dimensions.height }, options.animations);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, dimensions, options, dispatchers);
    this.tooltip.render(wrapper);

    this.xScale = new XScale(categories, options, dimensions);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categories, x, dimensions, options.axis.x);
    this.xAxis.render(svg);

    this.pointOverlay = new ClosestPointOverlay(categories, x, dimensions, dispatchers);
    this.pointOverlay.render(svg);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);

      if (data.length > 0) {
        const yScale = new YScale(data, yOptions, options.layout, dimensions, options);
        const y = yScale.generate();

        // only use the first series for the grid
        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);

          this.zeroLine = new ZeroLine(x, y, dimensions, options);
          this.zeroLine.render(svg);
        }

        const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
        yAxis.render(svg);

        const plotOptions = deepmerge(this.getPlotOptions(this.type, false), options);

        const seriesLine = new SeriesLine(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        seriesLine.render(svg);

        const seriesPoi = new SeriesPoi(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        seriesPoi.render(svg);

        const seriesDataLabel = new SeriesDataLabel(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        seriesDataLabel.render(svg);

        const annotations = new Annotations(
          data,
          x,
          y,
          options,
          plotOptions.layout,
          dispatchers,
          yAxisIndex,
        );

        annotations.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesLine,
          seriesPoi,
          seriesDataLabel,
          annotations,
        };
      }
    });

    svg.selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options, dispatchers);

    const x = this.xScale.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    this.pointOverlay.update(categories, x, dimensions, dispatchers, options);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        const plotOptions = deepmerge(this.getPlotOptions(this.type), options);

        scale.seriesLine.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        scale.seriesPoi.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        scale.seriesDataLabel.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        scale.annotations.update(data, x, y, options, plotOptions.layout, dispatchers, yAxisIndex);
      }
    });

    svg.selectAll(CSS.getClassSelector('series')).raise();
  }
}

export default LineChart;
