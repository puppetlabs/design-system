import { event } from 'd3-selection';
import CSS from '../helpers/css';
import helpers from '../helpers/charting';

class Annotations {
  constructor(data, x, y, options, layout, dispatchers, yAxisIndex, x1) {
    this.data = data;
    this.x = x;
    this.x1 = x1;
    this.y = y;
    this.options = options;
    this.layout = layout;
    this.annotations = options.annotations;
    this.dispatchers = dispatchers;
    this.yAxisIndex = yAxisIndex;

    this.getTransform = this.getTransform.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(annotation) {
    const location = { x: 0, y: 0 };
    const options = this.options;
    let layout = this.layout;

    if (annotation.highestPoint) {
      const point = helpers.getMaximumPoint(this.data, options, layout);

      if (point) {
        if (layout === 'combination') {
          layout = this.options[point.seriesType] && this.options[point.seriesType].layout;
        }

        if (layout === 'grouped') {
          location.x = this.x1(point.seriesLabel) + this.x(point.x) + (this.x1.bandwidth() / 2);
        } else {
          location.x = this.x(point.x);

          if (this.x.bandwidth) {
            location.x += this.x.bandwidth() / 2;
          }
        }

        if (layout === 'stacked') {
          location.y = this.y(point.y + point.y0);
        } else {
          location.y = this.y(point.y);
        }
      }
    }

    return location;
  }

  getTransform(d, padding = 0) {
    const point = this.getLocation(d);
    const orientation = this.options.axis.x.orientation;
    let translate;

    switch (orientation) {
      case 'left': case 'right':
        translate = `translate(${point.y + 20 + padding}, ${point.x}), rotate(90)`;
        break;
      default:
        translate = `translate(${point.x}, ${point.y - 20 - padding})`;
    }

    return translate;
  }

  render(selection) {
    const { yAxisIndex, dispatchers, data, layout } = this;
    let annotations = this.annotations || [];

    if (!this.selection) {
      this.selection = selection;
    }

    annotations = annotations.filter(a => (
      a.yAxis === yAxisIndex || (a.yAxis === undefined && yAxisIndex === 0)),
    );

    const selector = `annotation-axis-y-${yAxisIndex}`;

    const points = this.selection.selectAll(CSS.getClassSelector(selector))
      .data(annotations);

    points.exit().remove();

    // If there's no data, let's cancel everything.
    if (!data.some(s => s.data.some(d => d.y !== null))) {
      points.remove();

      return;
    }

    points.attr('transform', this.getTransform);

    const point = points.enter()
      .append('path')
        .attr('class', CSS.getClassName('annotation', selector))
        .attr('d', 'M0,2v14l5-5h9c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H2C0.895,0,0,0.895,0,2z');

    if (this.options.animations.enabled) {
      point
        .style('visibility', 'hidden')
        .transition()
          .duration(this.options.animations.duration)
          .attrTween('transform', t => (i) => {
            const margin = 20 - (20 * i);

            return this.getTransform(t, margin);
          })
          .style('visibility', 'visible');
    } else {
      point.attr('transform', this.getTransform);
    }

    if (dispatchers.enabled('annotationClick.external')) {
      point
        .style('cursor', 'pointer')
        .on('click', (annotation) => {
          const p = helpers.getMaximumPoint(data, layout);

          dispatchers.call('annotationClick', this, { event, data: { annotation, point: p } });
        });
    }
  }

  update(data, x, y, options, layout, dispatchers, yAxisIndex, x1) {
    this.data = data;
    this.x = x;
    this.x1 = x1;
    this.y = y;
    this.options = options;
    this.layout = layout;
    this.dispatchers = dispatchers;
    this.yAxisIndex = yAxisIndex;

    this.render();
  }
}

export default Annotations;
