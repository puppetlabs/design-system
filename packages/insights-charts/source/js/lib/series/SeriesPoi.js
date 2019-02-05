import { event, select, mouse } from 'd3-selection';
import { easeLinear } from 'd3-ease';
import {
  POI_RADIUS,
  POI_RADIUS_ACTIVE,
  POI_ANIMATION_DURATION,
  VIZ_TYPES,
} from '../../constants';
import CSS from '../../helpers/css';
import Series from './Series';
import helpers from '../../helpers/charting';

class SeriesPoi extends Series {
  constructor(
    data,
    dimensions,
    x,
    y,
    clipPathId,
    options,
    dispatchers,
    yAxisIndex,
    z,
  ) {
    super(
      data,
      dimensions,
      x,
      y,
      clipPathId,
      options,
      dispatchers,
      yAxisIndex,
      'series-poi',
      z,
    );

    this.renderCount = 0;

    if (!this.isDisabled()) {
      const isOnHover = this.isOnHover();
      this.eventName = `activatePointOfInterest.axis-y-${yAxisIndex}`;

      this.getX = this.getX.bind(this);
      this.getY = this.getY.bind(this);
      this.getRadius = this.getRadius.bind(this);

      dispatchers.on(this.eventName, (activatedX, activatedY) => {
        let revisedActivatedX = activatedX;

        // eslint-disable-next-line no-underscore-dangle
        if (revisedActivatedX && revisedActivatedX._isAMomentObject) {
          revisedActivatedX = activatedX.toString();
        }

        const shouldHighlight = d => {
          const category = typeof d.x === 'object' ? d.x.toString() : d.x;
          let highlight;

          // If we want to highlight the whole category, then we only need to make sure the
          // category is the same.
          if (
            typeof options.highlightCategory === 'undefined' ||
            options.highlightCategory
          ) {
            highlight = category === revisedActivatedX;
          } else {
            // Otherwise, we need to make sure this is the exact point we want to highlight.
            highlight = category === revisedActivatedX && d.y === activatedY;
          }

          return highlight;
        };

        this.selection.selectAll(CSS.getClassSelector('poi')).each(function(d) {
          const point = select(this);
          const isHidden = point.classed(CSS.getClassName('poi-hidden'));
          const isBubble = d.seriesType === VIZ_TYPES.BUBBLE;
          const isActive = point.classed(CSS.getClassName('poi-active'));

          if (!isHidden && !isBubble && shouldHighlight(d)) {
            point
              .attr('class', CSS.getClassName('poi', 'poi-active'))
              .attr('opacity', 1)
              .transition()
              .duration(POI_ANIMATION_DURATION)
              .ease(easeLinear)
              .attr('r', POI_RADIUS_ACTIVE);
          } else if (!isHidden && !isBubble && isActive) {
            point
              .transition()
              .duration(POI_ANIMATION_DURATION)
              .ease(easeLinear)
              .attr('r', POI_RADIUS)
              .attr('opacity', isOnHover ? 0 : 1);
          }
        });
      });
    }
  }

  isDisabled() {
    const options = this.options || {};
    const poiOptions = options.pointsOfInterest || {};

    return poiOptions.enabled === false;
  }

  isOnHover() {
    const options = this.options || {};
    const poiOptions = options.pointsOfInterest || {};

    return poiOptions.onHover !== false;
  }

  isHorizontal() {
    const { orientation } = this.options.axis.x;

    return orientation === 'left' || orientation === 'right';
  }

  getX(d) {
    let result = this.x(d.x);

    if (this.x.bandwidth) {
      result += this.x.bandwidth() / 2;
    }

    return result;
  }

  getY(d) {
    const { y, options } = this;
    const isStacked = options.layout === 'stacked';
    const isBubble = options.type === VIZ_TYPES.BUBBLE;

    let cyPos;

    if (isStacked && !isBubble) {
      if (d.y < 0 && d.y0 > 0) {
        cyPos = y(d.y === null ? y.domain()[0] : d.y);
      } else {
        cyPos = y(d.y0 + (d.y || 0));
      }
    } else {
      cyPos = y(d.y === null ? y.domain()[0] : d.y);
    }

    return cyPos;
  }

  getRadius(d) {
    const { z, dimensions } = this;
    let radius = POI_RADIUS;

    if (z) {
      radius = helpers.getBubbleRadius(
        d.z,
        z,
        dimensions.width,
        dimensions.height,
      );
    }

    return radius;
  }

  render(selection) {
    this.renderCount += 1;

    const { options, dispatchers } = this;
    const animationEnabled = options.animations && options.animations.enabled;

    if (!this.isDisabled()) {
      if (!this.selection) {
        this.selection = selection;
      }

      this.data.forEach(series => {
        if (series.type === VIZ_TYPES.BUBBLE) {
          series.data.sort((a, b) => b.z - a.z);
        }
      });

      this.series = selection
        .selectAll(CSS.getClassSelector(this.selector))
        .data(this.data, d => d.seriesIndex);

      this.series.exit().remove();

      this.series = this.series
        .enter()
        .append('g')
        .merge(this.series);

      this.series.attr(
        'class',
        d =>
          `${CSS.getClassName('series', this.selector)} ${CSS.getColorClassName(
            d.seriesIndex,
          )}`,
      );

      let pois = this.series
        .selectAll(CSS.getClassSelector('poi'))
        .data(d => (!d.disabled ? d.data : []), d => d.categoryIndex);

      pois.exit().remove();

      pois = pois
        .enter()
        .append('circle')
        .merge(pois);

      pois
        .attr('class', CSS.getClassName('poi'))
        .attr('r', d => this.getRadius(d))
        .attr('cx', this.isHorizontal() ? this.getY : this.getX)
        .attr('cy', this.isHorizontal() ? this.getX : this.getY)
        .attr('style', d => (d.color ? `stroke: ${d.color};` : null))
        .classed(CSS.getClassName('poi-hidden'), this.getHiddenClass)
        .attr('opacity', 0)
        .on('mousemove', d => {
          dispatchers.call('activatePointOfInterest', this, d.x, d.y);
        })
        .on('mouseover', d => {
          const dims = mouse(select('body').node());

          dispatchers.call(
            'tooltipMove',
            this,
            d.categoryIndex,
            d.seriesIndex,
            d.x,
            dims,
          );
          dispatchers.call('highlightSeries', this, d.seriesIndex);
        })
        .on('mouseout', () => {
          dispatchers.call('tooltipHide');
          dispatchers.call('activatePointOfInterest');
          dispatchers.call('unHighlightSeries');
        });

      const isOnHover = this.isOnHover();

      if (this.renderCount === 1 && animationEnabled && !isOnHover) {
        const isScatter = this.options.type === VIZ_TYPES.SCATTER;

        pois
          .transition()
          .delay(isScatter ? 0 : options.animations.duration)
          .duration(
            isScatter
              ? options.animations.duration
              : options.animations.duration / 4,
          )
          .attr('opacity', 1);
      } else if (!isOnHover) {
        pois.attr('opacity', 1);
      }

      if (dispatchers.enabled('dataPointClick.external')) {
        pois.style('cursor', 'pointer').on('mousedown', function(point) {
          dispatchers.call('dataPointClick', this, { event, data: { point } });
        });
      }
    }

    return this.series;
  }
}

export default SeriesPoi;
