import { select, mouse } from 'd3-selection';
import { easeLinear } from 'd3-ease';
import { POI_RADIUS, POI_RADIUS_ACTIVE, POI_ANIMATION_DURATION } from '../../constants';
import CSS from '../../helpers/css';
import Series from './Series';

class SeriesPoi extends Series {
  constructor(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex) {
    super(data, dimensions, x, y, clipPathId, options, dispatchers, yAxisIndex, 'series-poi');

    this.eventName = `activatePointOfInterest.axis-y-${yAxisIndex}`;

    dispatchers.on(this.eventName, (category) => {
      if (category && category._isAMomentObject) {  // eslint-disable-line no-underscore-dangle
        category = category.toString();
      }

      this.selection.selectAll(CSS.getClassSelector('poi')).each(function (d) {
        const point = select(this);
        const isActive = point.classed(CSS.getClassName('poi-active'));
        const datum = typeof d.x === 'object' ? d.x.toString() : d.x;

        if (datum === category) {
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
    const { x, y, options, dispatchers } = this;
    const isStacked = options.layout === 'stacked';

    if (!this.selection) {
      this.selection = selection;
    }

    this.series = selection.selectAll(CSS.getClassSelector(this.selector))
      .data(this.data, d => (d.seriesIndex));

    this.series
      .attr('class', d => (CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`)))
      .selectAll(CSS.getClassSelector('poi'))
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

    this.series.exit().remove();

    this.series = this.series.enter()
      .append('g')
        .attr('class', d => (CSS.getClassName('series', this.selector, `color-${d.seriesIndex}`)))
        .attr('clip-path', `url(#${this.clipPathId})`)
      .selectAll(CSS.getClassSelector('poi'))
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
        })
      .merge(this.series);

    return this.series;
  }
}

export default SeriesPoi;
