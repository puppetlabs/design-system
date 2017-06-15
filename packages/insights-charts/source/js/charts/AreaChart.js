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
import CSS from '../helpers/css';

class AreaChart extends Chart {
  constructor({ elem, data, options, dispatchers }) {
    super({ elem, data, options, dispatchers });

    this.type = 'area';
    this.yScales = {};
  }

  render() {
    const categories = this.data.getCategories();
    const seriesData = this.data.getSeries();
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

      if (data.length > 0) {
        const yScale = new YScale(data, yOptions, options.layout, dimensions);
        const y = yScale.generate();
        const yAxis = new YAxis(y, dimensions, yOptions);
        yAxis.render(svg);

        if (yAxisIndex === 0) {
          this.grid = new Grid(x, y, dimensions, options);
          this.grid.render(svg);
        }

        const seriesArea = new SeriesArea(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
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
          options,
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
          options,
          dispatchers,
          yAxisIndex,
        );

        seriesPoi.render(svg);

        this.yScales[yAxisIndex] = {
          yScale,
          yAxis,
          seriesArea,
          seriesLine,
          seriesPoi,
        };
      }
    });

    selectAll(CSS.getClassSelector('series')).raise();

    this.clipPath.animate(dimensions);
  }

  update() {
    const categories = this.data.getCategories();
    const seriesData = this.data.getSeries();
    const dispatchers = this.dispatchers;
    const options = this.options;

    this.container.update(this.data, options, this.type, dispatchers);
    const dimensions = this.container.getDimensions();

    this.clipPath.update(dimensions);
    this.tooltip.update(seriesData, dimensions, options.tooltips, dispatchers);

    const x = this.xScale.update(categories, options, dimensions, this.type);
    this.xAxis.update(categories, x, dimensions, options.axis.x);

    this.pointOverlay.update(categories, x, dimensions, dispatchers);

    options.axis.y.forEach((yOptions, yAxisIndex) => {
      const data = this.data.getDataByYAxis(yAxisIndex);
      const scale = this.yScales[yAxisIndex];

      if (scale) {
        const y = scale.yScale.update(data, yOptions, options.layout, dimensions);

        if (yAxisIndex === 0) {
          this.grid.update(x, y, dimensions, options);
        }

        scale.yAxis.update(y, dimensions, yOptions, yAxisIndex);

        scale.seriesArea.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
          dispatchers,
          yAxisIndex,
        );

        scale.seriesLine.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
          dispatchers,
          yAxisIndex,
        );

        scale.seriesPoi.update(
          data,
          dimensions,
          x,
          y,
          this.clipPath.id,
          options,
          dispatchers,
          yAxisIndex,
        );
      }
    });
  }
}

export default AreaChart;
