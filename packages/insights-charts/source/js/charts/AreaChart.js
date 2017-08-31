import deepmerge from 'deepmerge';
import clone from 'clone';
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
import SeriesArea from '../lib/series/SeriesArea';
import SeriesLine from '../lib/series/SeriesLine';
import SeriesPoi from '../lib/series/SeriesPoi';
import SeriesDataLabel from '../lib/series/SeriesDataLabel';
import CSS from '../helpers/css';

class AreaChart extends Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    super({ elem, type, data, options, dispatchers, id });

    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = clone(this.options);

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath =
      new ClipPath({ width: 0, height: dimensions.height }, options.animations, this.id);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, options, dispatchers, this.id);
    this.tooltip.render();

    this.xScale = new XScale(categories, options, dimensions);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categories, x, dimensions, options.axis.x);
    this.xAxis.render(svg);

    if (!options.tooltips || !options.tooltips.type || options.tooltips.type !== 'simple') {
      this.pointOverlay = new ClosestPointOverlay(categories, x, dimensions, dispatchers);
      this.pointOverlay.render(svg);
    }

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);

      if (data.length > 0) {
        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));

        const yScale = new YScale(data, yOptions, plotOptions.layout, dimensions, options);
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);

          this.zeroLine = new ZeroLine(x, y, dimensions, options);
          this.zeroLine.render(svg);
        }

        const seriesArea = new SeriesArea(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

        seriesArea.render(svg);

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
          seriesArea,
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
    const options = clone(this.options);

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, options, dispatchers, this.id);

    const x = this.xScale.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    if (this.pointOverlay) {
      this.pointOverlay.update(categories, x, dimensions, dispatchers, options);
    }

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));
        const y = scale.yScale.update(data, yOptions, plotOptions.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        scale.seriesArea.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
        );

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

export default AreaChart;
