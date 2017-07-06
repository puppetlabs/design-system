import deepmerge from 'deepmerge';
import { selectAll } from 'd3-selection';
import Chart from './Chart';
import { XScale, YScale } from '../lib/scales';
import { XAxis, YAxis } from '../lib/axis';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import Grid from '../lib/Grid';
import ClosestPointOverlay from '../lib/ClosestPointOverlay';
import Tooltip from '../lib/Tooltip';
import SeriesArea from '../lib/series/SeriesArea';
import SeriesLine from '../lib/series/SeriesLine';
import SeriesPoi from '../lib/series/SeriesPoi';
import SeriesColumn from '../lib/series/SeriesColumn';
import CSS from '../helpers/css';

class CombinationChart extends Chart {
  constructor({ elem, type, data, options, dispatchers }) {
    super({ elem, type, data, options, dispatchers });

    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories().map(c => (c.label));
    const seriesData = this.data.getSeries();
    const groups = this.data.getGroupsByType('column');
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, this.type, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath({ width: 0, height: dimensions.height }, options.animations);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, dimensions, options.tooltips, dispatchers);
    this.tooltip.render(wrapper);

    this.xScale = new XScale(categories, options, dimensions, this.type);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categories, x, dimensions, options.axis.x);
    this.xAxis.render(svg);

    this.pointOverlay = new ClosestPointOverlay(categories, x, dimensions, dispatchers);
    this.pointOverlay.render(svg);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      let seriesColumn;
      let seriesLine;
      let seriesLinePoi;
      let seriesScatter;
      let seriesArea;
      let seriesAreaLine;
      let seriesAreaPoi;

      if (data.length > 0) {
        const types = data.map(d => (d.type));
        const yScale = new YScale(data, yOptions, null, dimensions, options);
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);
        }

        if (types.indexOf('column') >= 0) {
          const xScaleColumn = new XScale(categories, options, dimensions, 'column');
          const xColumn = xScaleColumn.generate();

          const x1Dimensions = Object.assign({}, dimensions, { width: xColumn.bandwidth() });
          this.xScale1 = new XScale(groups, options, x1Dimensions, 'column');
          const x1 = this.xScale1.generate();

          const columnData = data.filter(d => (d.type === 'column'));
          const plotOptions = this.getPlotOptions('column');

          seriesColumn = new SeriesColumn(
            columnData,
            dimensions,
            xColumn,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
            x1,
          );

          seriesColumn.render(svg);
        }

        if (types.indexOf('scatter') >= 0) {
          const scatterData = data.filter(d => (d.type === 'scatter'));
          const plotOptions = this.getPlotOptions('scatter');

          seriesScatter = new SeriesPoi(
            scatterData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            deepmerge(plotOptions, { animations: { enabled: true } }),
            dispatchers,
            yAxisIndex,
          );

          seriesScatter.render(svg);
        }

        if (types.indexOf('line') >= 0) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = this.getPlotOptions('line');

          seriesLine = new SeriesLine(
            lineData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesLine.render(svg);

          seriesLinePoi = new SeriesPoi(
            lineData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesLinePoi.render(svg);
        }

        if (types.indexOf('area') >= 0) {
          const areaData = data.filter(d => (d.type === 'area'));
          const plotOptions = this.getPlotOptions('area');

          seriesArea = new SeriesArea(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesArea.render(svg);

          seriesAreaLine = new SeriesLine(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaLine.render(svg);

          seriesAreaPoi = new SeriesPoi(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaPoi.render(svg);
        }

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesColumn,
          seriesLine,
          seriesLinePoi,
          seriesScatter,
          seriesArea,
          seriesAreaLine,
          seriesAreaPoi,
        };
      }
    });

    selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories().map(c => (c.label));
    const groups = this.data.getGroupsByType('column');
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, this.type, dispatchers);
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options.tooltips, dispatchers);

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
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        if (scale.seriesColumn) {
          const columnData = data.filter(d => (d.type === 'column'));
          const xScaleColumn = new XScale(categories, options, dimensions, 'column');
          const xColumn = xScaleColumn.generate();

          const x1Dimensions = Object.assign({}, dimensions, { width: xColumn.bandwidth() });

          this.xScale1 = new XScale(groups, options, x1Dimensions, 'column');
          const x1 = this.xScale1.generate();

          const plotOptions = this.getPlotOptions('column');

          scale.seriesColumn.update(
            columnData,
            dimensions,
            xColumn,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
            x1,
          );
        }

        if (scale.seriesScatter) {
          const scatterData = data.filter(d => (d.type === 'scatter'));
          const plotOptions = this.getPlotOptions('scatter');

          scale.seriesScatter.update(
            scatterData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            deepmerge(plotOptions, { animations: { enabled: true } }),
            dispatchers,
            yAxisIndex,
          );
        }

        if (scale.seriesLine) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = this.getPlotOptions('line');

          scale.seriesLine.update(
            lineData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesLinePoi.update(
            lineData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }

        if (scale.seriesArea) {
          const areaData = data.filter(d => (d.type === 'area'));
          const plotOptions = this.getPlotOptions('area');

          scale.seriesArea.update(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaLine.update(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaPoi.update(
            areaData,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }
      }
    });
  }
}

export default CombinationChart;
