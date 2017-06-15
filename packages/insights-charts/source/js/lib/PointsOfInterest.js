import { mouse, select } from 'd3-selection';
import { easeLinear } from 'd3-ease';

import CSS from '../helpers/css';

import { POI_RADIUS, POI_RADIUS_ACTIVE, POI_ANIMATION_DURATION } from '../constants';

class PointsOfInterest {
  constructor(x, y, dispatchers, options, yAxisIndex) {
    this.x = x;
    this.y = y;
    this.yAxisIndex = yAxisIndex;
    this.options = options;
    this.dispatchers = dispatchers;
    this.eventName = `activatePointOfInterest.axis-y-${yAxisIndex}`;
  }

  bindDispatchers() {
    const { dispatchers } = this;

    dispatchers.on(this.eventName, (category) => {
      if (category && category._isAMomentObject) {  // eslint-disable-line no-underscore-dangle
        category = category.toString();
      }

      this.points.each(function (d) {
        const point = select(this);
        const isActive = point.classed(CSS.getClassName('poi-active'));
        const x = typeof d.x === 'object' ? d.x.toString() : d.x;

        if (x === category) {
          point.attr('class', CSS.getClassName('poi', 'poi-active'))
            .transition()
            .duration(POI_ANIMATION_DURATION)
            .ease(easeLinear)
            .attr('r', POI_RADIUS_ACTIVE);
        } else if (isActive) {
          point.transition()
          .duration(POI_ANIMATION_DURATION)
          .ease(easeLinear)
          .attr('r', POI_RADIUS);
        }
      });
    });
  }

  render(selection) {
    const { x, y, dispatchers, options } = this;
    const isStacked = options.layout === 'stacked';

    if (!this.selection) {
      this.selection = selection;
    }

    this.points = selection.selectAll(CSS.getClassSelector('poi'))
      .data(d => (!d.disabled ? d.data : []))
      .enter()
      .append('circle')
      .attr('class', CSS.getClassName('poi'))
      .attr('r', POI_RADIUS)
      .attr('cx', d => (x(d.x)))
      .attr('cy', (d) => {
        let cyPos;

        if (isStacked) {
          if (d.y < 0 && d.y0 > 0) {
            cyPos = y(d.y);
          } else {
            cyPos = y(d.y0 + d.y);
          }
        } else {
          cyPos = y(d.y);
        }

        return cyPos;
      })
      .attr('style', (d) => {
        const color = d.seriesColor;

        return color ? `stroke: ${color}` : null;
      })
      .on('mousemove', function (d) {
        dispatchers.call('activatePointOfInterest', this, d.x);
      })
      .on('mouseover', function (d, i) {
        dispatchers.call('tooltipMove', this, i, d.x, mouse(this));
        dispatchers.call('highlightSeries', this, d.seriesIndex);
      })
      .on('mouseout', () => {
        dispatchers.call('unHighlightSeries');
      });

    this.bindDispatchers();

    return this.points;
  }

  update(x, y, dispatchers, options, yAxisIndex) {
    this.x = x;
    this.y = y;
    this.dispachters = dispatchers;
    this.options = options;
    this.yAxisIndex = yAxisIndex;

    if (this.points) {
      const isStacked = options.layout === 'stacked';

      this.points
        .attr('cx', d => x(d.x))
        .attr('cy', (d) => {
          let cyPos;

          if (isStacked) {
            if (d.y < 0 && d.y0 > 0) {
              cyPos = y(d.y);
            } else {
              cyPos = y(d.y0 + d.y);
            }
          } else {
            cyPos = y(d.y);
          }

          return cyPos;
        });
    } else {
      this.render(this.selection);
    }

    this.bindDispatchers();
  }

  remove() {
    this.points.remove();
    this.points = null;

    this.dispatchers.on(this.eventName, null);
  }
}

export default PointsOfInterest;
