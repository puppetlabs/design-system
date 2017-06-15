import { mouse } from 'd3-selection';
import CSS from '../helpers/css';

class Columns {
  constructor(seriesData, x, y, options, dimensions, dispatchers, x1) {
    this.x = x;
    this.x1 = x1;
    this.y = y;
    this.options = options;
    this.seriesData = seriesData;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;
  }

  render(selection) {
    const { x, x1, y, options, dimensions, dispatchers } = this;
    const { height } = dimensions;

    if (!this.selection) {
      this.selection = selection;
    }

    const isStacked = options.layout === 'stacked';
    const isGrouped = options.layout === 'grouped';

    const getMouseDimensions = (dims, d) => {
      // If we're grouping, we need to account for the translate.
      if (isGrouped) {
        dims[0] += x(d.x);
      }

      return dims;
    };

    selection.selectAll(CSS.getClassSelector('column-rect'))
      .data(d => d.data)
      .enter()
      .append('svg:rect')
      .attr('transform', (d) => {
        let result;

        if (isGrouped) {
          result = `translate(${x(d.x)},0)`;
        }

        return result;
      })
      .attr('x', (d) => {
        let val = x(d.x);

        if (isGrouped) {
          val = x1(d.seriesLabel);
        }

        return val;
      })
      .attr('y', (d) => {
        let yPos;

        if (isStacked) {
          if (d.y < 0 && d.y0 > 0) {
            yPos = y(d.y);
          } else {
            yPos = y(d.y0 + d.y);
          }
        } else if (isGrouped) {
          yPos = y(d.y);
        } else {
          yPos = y.domain()[0] < 0 ? y(d.y) : height;
        }

        return yPos;
      })
      .attr('width', () => (isGrouped ? x1.bandwidth() : x.bandwidth()))
      .attr('style', d => (d.seriesColor ? `fill: ${d.seriesColor};` : null))
      .attr('height', (d) => {
        let val;

        if (isStacked) {
          val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : height - y(d.y);
        } else {
          val = height - y(d.y);
        }

        return val;
      })
      .on('mousemove', function (d, i) {
        const dims = mouse(this);

        dispatchers.call('tooltipMove', this, i, d.x, getMouseDimensions(dims, d));
        dispatchers.call('activatePointOfInterest', this, d.x);
      })
      .on('mouseover', function (d, i) {
        const index = d.seriesIndex;
        const dims = mouse(this);

        dispatchers.call('tooltipMove', this, i, d.x, getMouseDimensions(dims, d));
        dispatchers.call('highlightSeries', this, index);
      })
      .on('mouseout', () => {
        dispatchers.call('tooltipHide');
        dispatchers.call('unHighlightSeries');
      })
      .attr('class', CSS.getClassName('column-rect'));
  }
}
export default Columns;
