import deepmerge from 'deepmerge';
import Chart from './Chart';
import { XScale, YScale, ZScale } from '../lib/scales';
import { XAxis, YAxis } from '../lib/axis';
import Annotations from '../lib/Annotations';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import Grid from '../lib/Grid';
import ZeroLine from '../lib/ZeroLine';
import Tooltip from '../lib/Tooltip';
import Zoomer from '../lib/Zoomer';
import SeriesPoi from '../lib/series/SeriesPoi';
import SeriesDataLabel from '../lib/series/SeriesDataLabel';
import CSS from '../helpers/css';

class ScatterChart extends Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    super({ elem, type, data, options, dispatchers, id });

    this.yScales = {};

    dispatchers.on('zoom', this.update);
  }

  render() {
    const categories = this.data.getCategories();
    const categoryLabels = categories.map(c => (c.label));

    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath(dimensions, options, this.id);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, options, dispatchers, this.id);
    this.tooltip.render();

    this.xScale = new XScale(categoryLabels, options, dimensions, seriesData);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categoryLabels, x, dimensions, options);
    this.xAxis.render(svg);

    this.zoomer = new Zoomer(categories, x, dimensions, options, dispatchers);
    this.zoomer.render(svg);

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

        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));

        plotOptions.highlightCategory = false;

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

        if (options && options.type === 'bubble') {
          this.zScale = new ZScale(data, dimensions);
          const z = this.zScale.generate();
          seriesPoi.z = z;
        }

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
          seriesPoi,
          seriesDataLabel,
          annotations,
        };
      }
    });

    svg.selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate();
  }

  update(zoom = {}) {
    if (zoom.reset || zoom.categories) {
      this.data.setZoomCategories(zoom.categories);
    }

    const categories = this.data.getCategories();
    const categoryLabels = categories.map(c => (c.label));
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions, options, this.id);
    this.tooltip.update(seriesData, options, dispatchers, this.id);

    const x = this.xScale.update(categoryLabels, options, dimensions, this.type);
    this.xAxis.update(categoryLabels, x, dimensions, options);

    this.zoomer.update(categories, x, dimensions, options, dispatchers);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));

        plotOptions.highlightCategory = false;

        const y = scale.yScale.update(data, yOptions, plotOptions.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        if (options && options.type === 'bubble') {
          const z = this.zScale.update(data, dimensions);
          scale.seriesPoi.z = z;
        }

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

  destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }
}

export default ScatterChart;
