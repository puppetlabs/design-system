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
import Tooltip from '../lib/Tooltip';
import Zoomer from '../lib/Zoomer';
import SeriesColumn from '../lib/series/SeriesColumn';
import SeriesDataLabel from '../lib/series/SeriesDataLabel';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';

class ColumnChart extends Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    super({ elem, type, data, options, dispatchers, id });

    this.yScales = {};

    dispatchers.on('zoom', this.update);
  }

  isBar() {
    const orientation = this.options.axis.x.orientation;

    return orientation === 'left' || orientation === 'right';
  }

  render() {
    const categories = this.data.getCategories();
    const categoryLabels = categories.map(c => (c.label));
    const groups = this.data.getGroups();
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = clone(this.options);

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    const animationDirection = this.isBar() ? 'horizontal' : 'vertical';
    this.clipPath = new ClipPath(dimensions, options, this.id, animationDirection);
    this.clipPath.render(svg);

    this.xScale = new XScale(categoryLabels, options, dimensions);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categoryLabels, x, dimensions, options);
    this.xAxis.render(svg);

    this.zoomer = new Zoomer(categories, x, dimensions, options, dispatchers);
    this.zoomer.render(svg);

    let x1Dimension;

    if (this.isBar()) {
      x1Dimension = { height: x.bandwidth() };
    } else {
      x1Dimension = { width: x.bandwidth() };
    }

    const x1Dimensions = Object.assign({}, dimensions, x1Dimension);
    this.xScale1 = new XScale(groups, options, x1Dimensions);
    const x1 = this.xScale1.generate();

    this.tooltip = new Tooltip(seriesData, options, dispatchers, this.id);
    this.tooltip.render();

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      let data = this.data.getDataByYAxis(yAxisIndex);

      if (data.length > 0) {
        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));

        if (plotOptions.layout === 'stacked') {
          data = helpers.stackData(data);
        }

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

        const seriesColumn = new SeriesColumn(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
          x1,
        );

        seriesColumn.render(svg);

        const seriesDataLabel = new SeriesDataLabel(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
          x1,
        );

        seriesDataLabel.render(svg);

        const annotations = new Annotations(
          data,
          x,
          y,
          plotOptions,
          plotOptions.layout,
          dispatchers,
          yAxisIndex,
          x1,
        );

        annotations.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesColumn,
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
    const groups = this.data.getGroups();
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = clone(this.options);

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    const animationDirection = this.isBar() ? 'horizontal' : 'vertical';
    this.clipPath.update(dimensions, options, this.id, animationDirection);
    this.tooltip.update(seriesData, options, dispatchers, this.id);

    const x = this.xScale.update(categoryLabels, options, dimensions, zoom);
    this.xAxis.update(categoryLabels, x, dimensions, options);

    this.zoomer.update(categories, x, dimensions, options, dispatchers);

    let x1Dimension;

    if (this.isBar()) {
      x1Dimension = { height: x.bandwidth() };
    } else {
      x1Dimension = { width: x.bandwidth() };
    }

    const x1Dimensions = Object.assign({}, dimensions, x1Dimension);
    this.xScale1 = new XScale(groups, options, x1Dimensions);
    const x1 = this.xScale1.generate();

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      let data = this.data.getDataByYAxis(yAxisIndex, categoryLabels);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const plotOptions = deepmerge(options, this.getPlotOptions(this.type, data));

        if (plotOptions.layout === 'stacked') {
          data = helpers.stackData(data);
        }

        const y = scale.yScale.update(data, yOptions, plotOptions.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        scale.seriesColumn.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          plotOptions,
          dispatchers,
          yAxisIndex,
          x1,
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
          x1,
        );

        scale.annotations.update(
          data,
          x,
          y,
          plotOptions,
          plotOptions.layout,
          dispatchers,
          yAxisIndex,
          x1,
        );
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

export default ColumnChart;
