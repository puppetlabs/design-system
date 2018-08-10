import { arc } from 'd3-shape';
import CSS from '../helpers/css';

class Gauge {
  constructor(seriesData, options, dimensions, dispatchers) {
    this.options = options;
    this.seriesData = seriesData;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;

    this.renderCount = 0;
  }

  render(selection) {
    const { options, dimensions } = this;
    const { width, height } = dimensions;
    let innerRadius;

    this.renderCount += 1;

    if (!this.selection) {
      this.selection = selection;
    }

    let radius = Math.min(width, height) / 2;
    const strokeWidth = radius * 0.05;
    radius -= strokeWidth * 2;

    if (options.innerRadius) {
      innerRadius = radius * (parseInt(options.innerRadius, 10) / 100);
    } else {
      innerRadius = radius * 0.90;
    }

    const minAngle = options.gauge.minAngle || -135;
    const maxAngle = options.gauge.maxAngle || 135;
    const range = maxAngle - minAngle;

    const outerArc = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(minAngle * (Math.PI / 180)) // Converting angle to radians
      .endAngle(maxAngle * (Math.PI / 180))
      .cornerRadius(100);

    const innerArc = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(minAngle * (Math.PI / 180)) // Converting angle to radians
      .endAngle((d) => {
        const minValue = options.gauge.minValue || 0;
        const maxValue = options.gauge.maxValue || 100;
        const valueRange = maxValue - minValue;
        const valuePercentage = d.y / valueRange;
        const angleValue = range * valuePercentage;

        return (minAngle + angleValue) * (Math.PI / 180);
      })
      .cornerRadius(100);

    let wrapper = selection.selectAll(CSS.getClassSelector('gauge-arc'));

    if (wrapper.size() === 0) {
      wrapper = selection.append('path');
    }

    wrapper
      .classed(CSS.getClassName('gauge-arc'), true)
      .attr('d', outerArc)
      .style('stroke-width', strokeWidth)
      .attr('transform', `translate(${(width / 2)},${(height / 2)})`);

    let value = selection.selectAll(CSS.getClassSelector('gauge-arc-value'))
      .data(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null));

    value.exit().remove();

    const newValue = value.enter().append('path');

    value = newValue.merge(value);

    value.classed(CSS.getClassName('gauge-arc-value'), true)
      .attr('d', innerArc)
      .attr('transform', `translate(${(width / 2)},${(height / 2)})`);

    let kpi = selection.selectAll(CSS.getClassSelector('gauge-kpi'))
      .data(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null));

    kpi.exit().remove();

    const newKpi = kpi.enter().append('text');

    kpi = newKpi.merge(kpi);

    const kpiFontSize = innerRadius / 1.5;

    kpi.classed(CSS.getClassName('gauge-kpi'), true)
      .attr('transform', `translate(${(width / 2)},${(height / 2)})`)
      .style('font-size', `${kpiFontSize}px`)
      .text(d => (d.y));

    let delta = selection.selectAll(CSS.getClassSelector('gauge-delta'))
      .data([options.gauge.delta.value]);

    delta.exit().remove();

    const newDelta = delta.enter().append('text');

    delta = newDelta.merge(delta);

    delta.classed(CSS.getClassName('gauge-delta'), true)
      .attr('transform', `translate(${(width / 2)},${(height / 2) + (kpiFontSize / 2)})`)
      .style('font-size', `${kpiFontSize / 3}px`)
      .text(d => (d));

    return wrapper;
  }

  update(seriesData, options, dimensions, dispatchers) {
    this.seriesData = seriesData;
    this.options = options;
    this.dimensions = dimensions;
    this.dispatchers = dispatchers;

    this.render(this.selection);
  }
}

export default Gauge;
