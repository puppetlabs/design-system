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

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const wrapper = this.container.getWrapper();
    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath({ width: 0, height: dimensions.height }, options.animations);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(seriesData, dimensions, options.tooltips, dispatchers);
    this.tooltip.render(wrapper);

    const ordinalOptions = deepmerge(options, { type: 'column' });
    this.xScale = new XScale(categories, ordinalOptions, dimensions);
    const x = this.xScale.generate();

    this.xScalePoint = new XScale(categories, options, dimensions);
    const xPoint = this.xScalePoint.generate();

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
      let x1;

      if (data.length > 0) {
        const types = data.map(d => (d.type));
        const yScale = new YScale(data, yOptions, null, dimensions, options);
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);

          this.zeroLine = new ZeroLine(x, y, dimensions, options);
          this.zeroLine.render(svg);
        }

        if (types.indexOf('column') >= 0) {
          const x1Dimensions = Object.assign({}, dimensions, { width: x.bandwidth() });
          this.xScale1 = new XScale(groups, ordinalOptions, x1Dimensions);
          x1 = this.xScale1.generate();

          const columnData = data.filter(d => (d.type === 'column'));
          const plotOptions = deepmerge(this.getPlotOptions('column'), options);

          seriesColumn = new SeriesColumn(
            columnData,
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
        }

        if (types.indexOf('scatter') >= 0) {
          const scatterData = data.filter(d => (d.type === 'scatter'));
          const plotOptions = deepmerge(this.getPlotOptions('scatter'), options);

          seriesScatter = new SeriesPoi(
            scatterData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesScatter.render(svg);
        }

        if (types.indexOf('line') >= 0) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = deepmerge(this.getPlotOptions('line'), options);

          seriesLine = new SeriesLine(
            lineData,
            dimensions,
            xPoint,
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
            xPoint,
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
          const plotOptions = deepmerge(this.getPlotOptions('area'), options);

          seriesArea = new SeriesArea(
            areaData,
            dimensions,
            xPoint,
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
            xPoint,
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
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaPoi.render(svg);
        }

        const annotations = new Annotations(
          data,
          x,
          y,
          options,
          'combination',
          dispatchers,
          yAxisIndex,
          x1,
        );

        annotations.render(svg);

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
          annotations,
        };
      }
    });

    svg.selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories().map(c => (c.label));
    const groups = this.data.getGroupsByType('column');
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options.tooltips, dispatchers);

    const ordinalOptions = deepmerge(options, { type: 'column' });
    const x = this.xScale.update(categories, ordinalOptions, dimensions);
    const xPoint = this.xScalePoint.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    this.pointOverlay.update(categories, x, dimensions, dispatchers, options);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];
      let x1;

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions, options);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        if (scale.seriesColumn) {
          const columnData = data.filter(d => (d.type === 'column'));
          const x1Dimensions = Object.assign({}, dimensions, { width: x.bandwidth() });

          this.xScale1 = new XScale(groups, ordinalOptions, x1Dimensions, 'column');
          x1 = this.xScale1.generate();

          const plotOptions = deepmerge(this.getPlotOptions('column'), options);

          scale.seriesColumn.update(
            columnData,
            dimensions,
            x,
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
          const plotOptions = deepmerge(this.getPlotOptions('scatter'), options);

          scale.seriesScatter.update(
            scatterData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }

        if (scale.seriesLine) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = deepmerge(this.getPlotOptions('line'), options);

          scale.seriesLine.update(
            lineData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesLinePoi.update(
            lineData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }

        if (scale.seriesArea) {
          const areaData = data.filter(d => (d.type === 'area'));
          const plotOptions = deepmerge(this.getPlotOptions('area'), options);

          scale.seriesArea.update(
            areaData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaLine.update(
            areaData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaPoi.update(
            areaData,
            dimensions,
            xPoint,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }

        scale.annotations.update(
          data,
          x,
          y,
          options,
          'combination',
          dispatchers,
          yAxisIndex,
          x1,
        );
      }
    });

    svg.selectAll(CSS.getClassSelector('series')).raise();
  }
}

export default CombinationChart;
