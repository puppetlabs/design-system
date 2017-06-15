import { select } from 'd3-selection';
import classnames from 'classnames';
import { UNHIGHLIGHTED_OPACITY } from '../constants';
import CSS from '../helpers/css';

class Legend {
  constructor(elem, seriesData, options, margins, dispatchers) {
    this.render(elem, seriesData, options, margins, dispatchers);
  }

  getLegendValues(seriesData, expanded) {
    let values = [];

    if (expanded) {
      values = seriesData[0].data.map((d, i) => ({
        label: d.x,
        seriesIndex: i,
      }));
    } else {
      values = seriesData;
    }

    return values;
  }

  render(elem, seriesData, options, margins, dispatchers) {
    let container;
    let legendItems;

    if (options.enabled) {
      container = elem
        .append('div')
        .attr('class', CSS.getClassName('legend'));

      const legend = container
        .append('div')
        .attr('class', CSS.getClassName('legend-inner'));

      if (margins.top) {
        legend.style('margin-top', `${margins.top}px`);
      }

      if (margins.right) {
        legend.style('margin-right', `${margins.right}px`);
      }

      const data = this.getLegendValues(seriesData, options.expanded);

      legendItems = legend.selectAll(CSS.getClassName('legend-item'))
        .data(data)
        .enter().append('div')
          .attr('class', (d, i) => (
            classnames(CSS.getClassName('legend-item'), CSS.getColorClassName(i), {
              [CSS.getClassName('legend-item-disabled')]: d.disabled,
            })
          ))
          .on('mouseover', (d) => {
            dispatchers.call('highlightSeries', this, d.seriesIndex);
          })
          .on('mouseout', () => {
            dispatchers.call('unHighlightSeries');
          })
          .on('click', (d) => {
            d.disabled = !d.disabled;

            dispatchers.call('legendItemClick', this, d);
            dispatchers.call('update');
          });


      dispatchers.on('update.legend', () => {
        legend.selectAll(CSS.getClassSelector('legend-item'))
          .classed(CSS.getClassName('legend-item-disabled'), d => (d.disabled));
      });

      dispatchers.on('highlightSeries.legend', (seriesIndex) => {
        legendItems.each(function (d, i) {
          select(this).attr('style', (i === seriesIndex) ? null : `opacity: ${UNHIGHLIGHTED_OPACITY}`);
        });
      });

      dispatchers.on('unHighlightSeries.legend', () => {
        legendItems.each(function () {
          select(this).attr('style', null);
        });
      });

      legendItems.append('span')
        .attr('class', CSS.getClassName('series-indicator'))
        .attr('style', d => (d.color ? `background: ${d.color};` : null));

      legendItems.append('span')
        .text(d => (d.label));
    }

    this.legend = container;
  }
}

export default Legend;
