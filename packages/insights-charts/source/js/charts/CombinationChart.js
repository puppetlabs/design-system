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
import Zoomer from '../lib/Zoomer';
import SeriesArea from '../lib/series/SeriesArea';
import SeriesLine from '../lib/series/SeriesLine';
import SeriesPoi from '../lib/series/SeriesPoi';
import SeriesColumn from '../lib/series/SeriesColumn';
import SeriesDataLabel from '../lib/series/SeriesDataLabel';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';
import { VIZ_TYPES } from '../constants';

class CombinationChart extends Chart {
  constructor(props) {
    super(props);

    props.dispatchers.on('zoom', this.update);
  }

  getDataByTypes(data, types = []) {
    const dataByType = {};
    const plotOptions = {};

    types.forEach(t => {
      if (dataByType[t] === undefined) {
        dataByType[t] = data.filter(d => d.type === t);
        plotOptions[t] = this.getPlotOptions(t, dataByType[t]);

        if (plotOptions[t].layout === 'stacked') {
          dataByType[t] = helpers.stackData(dataByType[t]);
        }
      }
    });

    return dataByType;
  }

  render() {
    const categories = this.data.getCategories();
    const categoryLabels = categories.map(c => c.label);
    const seriesData = this.data.getSeries();
    const groups = this.data.getGroupsByType(VIZ_TYPES.COLUMN);
    const { dispatchers } = this;
    const { options } = this;

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath(dimensions, options, this.id);
    this.clipPath.render(svg);

    this.tooltip = new Tooltip(
      seriesData,
      options.tooltips,
      dispatchers,
      this.id,
    );
    this.tooltip.render();

    this.xScale = new XScale(categoryLabels, options, dimensions);
    const x = this.xScale.generate();

    this.xAxis = new XAxis(categoryLabels, x, dimensions, options);
    this.xAxis.render(svg);

    this.zoomer = new Zoomer(categories, x, dimensions, options, dispatchers);
    this.zoomer.render(svg);

    if (
      !options.tooltips ||
      !options.tooltips.type ||
      options.tooltips.type !== 'simple'
    ) {
      this.pointOverlay = new ClosestPointOverlay(
        categories,
        x,
        dimensions,
        dispatchers,
      );
      this.pointOverlay.render(svg);
    }

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);

      let seriesColumn;
      let seriesColumnDataLabel;
      let seriesLine;
      let seriesLineDataLabel;
      let seriesLinePoi;
      let seriesScatter;
      let seriesScatterDataLabel;
      let seriesArea;
      let seriesAreaLine;
      let seriesAreaPoi;
      let seriesAreaDataLabel;
      let x1;

      if (data.length > 0) {
        const types = data.map(d => d.type);
        const dataByType = this.getDataByTypes(data, types);

        const yScale = new YScale(
          dataByType[types[0]],
          yOptions,
          null,
          dimensions,
          options,
        );
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions, yAxisIndex);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);

          this.zeroLine = new ZeroLine(x, y, dimensions, options);
          this.zeroLine.render(svg);
        }

        if (types.indexOf(VIZ_TYPES.COLUMN) >= 0) {
          const x1Dimensions = Object.assign({}, dimensions, {
            width: x.bandwidth(),
          });
          this.xScale1 = new XScale(groups, options, x1Dimensions);
          x1 = this.xScale1.generate();

          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.COLUMN, dataByType.column),
          );
          plotOptions.type = VIZ_TYPES.COLUMN;

          seriesColumn = new SeriesColumn(
            dataByType.column,
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

          seriesColumnDataLabel = new SeriesDataLabel(
            dataByType.column,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
            x1,
          );

          seriesColumnDataLabel.render(svg);
        }

        if (types.indexOf(VIZ_TYPES.SCATTER) >= 0) {
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.SCATTER, dataByType.scatter),
          );

          seriesScatter = new SeriesPoi(
            dataByType.scatter,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesScatter.render(svg);

          seriesScatterDataLabel = new SeriesDataLabel(
            dataByType.scatter,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesScatterDataLabel.render(svg);
        }

        if (types.indexOf(VIZ_TYPES.LINE) >= 0) {
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.LINE, dataByType.line),
          );

          seriesLine = new SeriesLine(
            dataByType.line,
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
            dataByType.line,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesLinePoi.render(svg);

          seriesLineDataLabel = new SeriesDataLabel(
            dataByType.line,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesLineDataLabel.render(svg);
        }

        if (types.indexOf(VIZ_TYPES.AREA) >= 0) {
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.AREA, dataByType.area),
          );

          seriesArea = new SeriesArea(
            dataByType.area,
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
            dataByType.area,
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
            dataByType.area,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaPoi.render(svg);

          seriesAreaDataLabel = new SeriesPoi(
            dataByType.area,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaDataLabel.render(svg);
        }

        const annotations = new Annotations(
          data,
          x,
          y,
          options,
          VIZ_TYPES.COMBINATION,
          dispatchers,
          yAxisIndex,
          x1,
        );

        annotations.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesColumn,
          seriesColumnDataLabel,
          seriesLine,
          seriesLinePoi,
          seriesLineDataLabel,
          seriesScatter,
          seriesScatterDataLabel,
          seriesArea,
          seriesAreaLine,
          seriesAreaPoi,
          seriesAreaDataLabel,
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
    const categoryLabels = categories.map(c => c.label);
    const groups = this.data.getGroupsByType(VIZ_TYPES.COLUMN);
    const seriesData = this.data.getSeries();
    const { dispatchers } = this;
    const { options } = this;

    this.container.update(this.data, options, dispatchers);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions, options, this.id);
    this.tooltip.update(seriesData, options.tooltips, dispatchers, this.id);

    const x = this.xScale.update(categoryLabels, options, dimensions);
    this.xAxis.update(categoryLabels, x, dimensions, options);

    this.zoomer.update(categories, x, dimensions, options, dispatchers);

    if (this.pointOverlay) {
      this.pointOverlay.update(categories, x, dimensions, dispatchers, options);
    }

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];
      let x1;

      if (scale) {
        const types = data.map(d => d.type);
        const dataByType = this.getDataByTypes(data, types);

        const y = scale.yScale.update(
          dataByType[types[0]],
          yOptions,
          options.layout,
          dimensions,
          options,
        );

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
          this.zeroLine.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        if (scale.seriesColumn) {
          const x1Dimensions = Object.assign({}, dimensions, {
            width: x.bandwidth(),
          });

          this.xScale1 = new XScale(groups, options, x1Dimensions);
          x1 = this.xScale1.generate();

          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.COLUMN, dataByType.column),
          );
          plotOptions.type = VIZ_TYPES.COLUMN;

          scale.seriesColumn.update(
            dataByType.column,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
            x1,
          );

          scale.seriesColumnDataLabel.update(
            dataByType.column,
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
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.SCATTER, dataByType.scatter),
          );

          scale.seriesScatter.update(
            dataByType.scatter,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesScatterDataLabel.update(
            dataByType.scatter,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );
        }

        if (scale.seriesLine) {
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.LINE, dataByType.line),
          );

          scale.seriesLine.update(
            dataByType.line,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesLinePoi.update(
            dataByType.line,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesLineDataLabel.update(
            dataByType.line,
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
          const plotOptions = deepmerge(
            options,
            this.getPlotOptions(VIZ_TYPES.AREA, dataByType.area),
          );

          scale.seriesArea.update(
            dataByType.area,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaLine.update(
            dataByType.area,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaPoi.update(
            dataByType.area,
            dimensions,
            x,
            y,
            this.clipPath.id,
            plotOptions,
            dispatchers,
            yAxisIndex,
          );

          scale.seriesAreaDataLabel.update(
            dataByType.area,
            dimensions,
            x,
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
          VIZ_TYPES.COMBINATION,
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
