import deepmerge from 'deepmerge';
import { selectAll } from 'd3-selection';
import Chart from './Chart';
import { XScale, YScale } from '../lib/scales';
import Container from '../lib/Container';
import ClipPath from '../lib/ClipPath';
import SeriesArea from '../lib/series/SeriesArea';
import SeriesLine from '../lib/series/SeriesLine';
import SeriesColumn from '../lib/series/SeriesColumn';
import CSS from '../helpers/css';

class SparklineChart extends Chart {
  constructor({ elem, type, data, options, dispatchers, id }) {
    super({ elem, type, data, options, dispatchers, id });

    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories().map(c => (c.label));
    const groups = this.data.getGroups();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container = new Container(this.data, options, dispatchers);
    this.container.render(this.elem);

    const svg = this.container.getSVG();
    const dimensions = this.container.getDimensions();

    this.clipPath = new ClipPath(dimensions, options, this.id);
    this.clipPath.render(svg);

    this.xScale = new XScale(categories, options, dimensions);
    const x = this.xScale.generate();

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      let seriesColumn;
      let seriesLine;
      let seriesArea;
      let seriesAreaLine;

      if (data.length > 0) {
        const types = data.map(d => (d.type));
        const yScale = new YScale(data, yOptions, options.layout, dimensions);
        const y = yScale.generate();

        if (types.indexOf('column') >= 0) {
          const columnOptions = deepmerge(options, { type: 'column' });
          const xScaleColumn = new XScale(categories, columnOptions, dimensions);
          const xColumn = xScaleColumn.generate();

          const x1Dimensions = Object.assign({}, dimensions, { width: xColumn.bandwidth() });
          this.xScale1 = new XScale(groups, options, x1Dimensions, this.type);
          const x1 = this.xScale1.generate();

          const columnData = data.filter(d => (d.type === 'column'));
          const plotOptions = deepmerge(options, this.getPlotOptions('column', columnData));

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

        if (types.indexOf('line') >= 0) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = deepmerge(options, this.getPlotOptions('line', lineData, false));

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
        }


        if (types.indexOf('area') >= 0) {
          const areaData = data.filter(d => (d.type === 'area'));
          const plotOptions = deepmerge(options, this.getPlotOptions('area', areaData));

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
            options,
            dispatchers,
            yAxisIndex,
          );

          seriesAreaLine.render(svg);
        }

        this.yScales[yAxisIndex] = {
          yScale,
          seriesColumn,
          seriesLine,
          seriesArea,
          seriesAreaLine,
        };
      }
    });

    selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate();
  }

  update() {
    const categories = this.data.getCategories().map(c => (c.label));
    const groups = this.data.getGroups();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, dispatchers);
    const dimensions = this.container.getDimensions();

    const x = this.xScale.update(categories, options, dimensions, this.type);

    this.clipPath.update(dimensions, options, this.id);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions);

        if (scale.seriesColumn) {
          const columnData = data.filter(d => (d.type === 'column'));
          const columnOptions = deepmerge(options, { type: 'column' });
          const xScaleColumn = new XScale(categories, columnOptions, dimensions);
          const xColumn = xScaleColumn.generate();

          const x1Dimensions = Object.assign({}, dimensions, { width: xColumn.bandwidth() });
          this.xScale1 = new XScale(groups, options, x1Dimensions);
          const x1 = this.xScale1.generate();

          const plotOptions = deepmerge(options, this.getPlotOptions('column', columnData));

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

        if (scale.seriesLine) {
          const lineData = data.filter(d => (d.type === 'line'));
          const plotOptions = deepmerge(options, this.getPlotOptions('line', lineData, false));

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
        }

        if (scale.seriesArea) {
          const areaData = data.filter(d => (d.type === 'area'));
          const plotOptions = deepmerge(options, this.getPlotOptions('area', areaData));

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
        }
      }
    });
  }
}

export default SparklineChart;
