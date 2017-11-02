import classnames from 'classnames';
import { event, mouse, select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { arc, pie as d3Pie } from 'd3-shape';
import { UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';

class Donut {
  constructor(seriesData, options, dimensions, dispatchers) {
    this.options = options;
    this.seriesData = seriesData;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;
  }

  bindDispatchers() {
    const { dispatchers } = this;

    dispatchers.on('highlightSeries', (index) => {
      this.arcs.each(function () {
        const selection = select(this);

        selection.attr('opacity', d => (d.data.categoryIndex === index ? null : UNHIGHLIGHTED_OPACITY));
      });
    });

    dispatchers.on('unHighlightSeries', () => {
      this.arcs.each(function () {
        const selection = select(this);

        selection.attr('opacity', null);
      });
    });
  }

  render(selection) {
    const { options, dimensions, dispatchers } = this;
    const { width, height } = dimensions;
    let innerRadius;

    if (!this.selection) {
      this.selection = selection;
    }

    const pie = d3Pie()
      .value(d => d.y)

      // We don't actually want to sort the pie... We'll put that on the client.
      // if we do decide we'd like to sort it, we'll need to sort the legend too.
      .sortValues(null);

    const radius = (Math.min(width, height) / 2.4);

    if (options.layout === 'pie') {
      innerRadius = 0;
    } else if (options.innerRadius) {
      innerRadius = radius * (parseInt(options.innerRadius, 10) / 100);
    } else {
      innerRadius = radius * 0.75;
    }

    const path = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius);

    this.arcs = selection.selectAll(CSS.getClassSelector('donut-arc-wrapper'))
      .data(pie(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null)), d => d.data.x);

    this.arcs
      .attr('transform', `translate(${(width / 2)},${(height / 2)})`)
      .attr('class', d => classnames(
        CSS.getClassName('donut-arc-wrapper'),
        CSS.getColorClassName(d.data.categoryIndex),
      ));

    this.arcs.selectAll(CSS.getClassSelector('donut-arc'))
      .attr('d', path);

    this.arcs.exit().remove();

    const newArcs = this.arcs.enter()
      .append('g')
        .attr('transform', `translate(${(width / 2)},${(height / 2)})`)
        .attr('class', d => classnames(
          CSS.getClassName('donut-arc-wrapper'),
          CSS.getColorClassName(d.data.categoryIndex),
        ))
        .on('mousemove', function mousemove(d) {
          const dims = mouse(select('body').node());

          dispatchers.call('tooltipMove', this, d.data.categoryIndex, 0, d.data.x, dims);
          dispatchers.call('activatePointOfInterest', this, d.data.x);
          dispatchers.call('highlightSeries', this, d.data.categoryIndex);
        })
        .on('mouseout', () => {
          dispatchers.call('tooltipHide');
          dispatchers.call('unHighlightSeries');
        });

    const paths = newArcs.append('path')
      .attr('class', CSS.getClassName('donut-arc'))
      .attr('style', d =>
        (d.data.color ? `fill: ${d.data.color}; stroke: ${d.data.color};` : null));

    if (dispatchers.enabled('dataPointClick.external')) {
      paths
        .style('cursor', 'pointer')
        .on('click', function (d) {
          dispatchers.call('dataPointClick', this, { event, data: { point: d.data } });
        });
    }

    paths.attr('d', path);

    this.arcs = newArcs.merge(this.arcs);

    if (options.animations.enabled) {
      paths.transition()
        .duration(options.animations.duration)
        .attrTween('d', (finish) => {
          const start = { startAngle: 0, endAngle: 0 };

          const interpolater = interpolate(start, finish);

          return (d) => {
            finish = interpolater(d);

            return path(finish);
          };
        });
    }

    this.bindDispatchers();

    return this.arcs;
  }

  update(seriesData, options, dimensions, dispatchers) {
    this.seriesData = seriesData;
    this.options = options;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;

    this.bindDispatchers();

    this.render(this.selection);
  }
}

export default Donut;
