import { arc } from 'd3-shape';
import CSS from '../helpers/css';

const degreesToRadians = degrees => degrees * (Math.PI / 180);
const centerTransform = (width, height) =>
  `translate(${width / 2},${height / 2})`;

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

    const radius = Math.min(width, height) / 2;

    if (options.innerRadius) {
      innerRadius = radius * (parseInt(options.innerRadius, 10) / 100);
    } else {
      innerRadius = radius * 0.8;
    }

    const minAngle = options.gauge.minAngle || -135;
    const maxAngle = options.gauge.maxAngle || 135;
    const range = maxAngle - minAngle;

    const outerArc = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(degreesToRadians(minAngle))
      .endAngle(degreesToRadians(maxAngle))
      .cornerRadius(100);

    const calculateEndAngle = (d, indicatorRadius = 0) => {
      const minValue = options.gauge.minValue || 0;
      const maxValue = options.gauge.maxValue || 100;
      const valueRange = maxValue - minValue;
      const valuePercentage = d.y / valueRange;
      const angleValue = range * valuePercentage;
      let remainder = 0;

      if (indicatorRadius > 0) {
        // Get the total number of degrees
        const degrees = Math.abs(maxAngle - minAngle);
        const totalCircumference = Math.PI * (innerRadius * 2);
        const circumferencePercentage = degrees / 360;
        const length = totalCircumference * circumferencePercentage;

        // What percentage of the total length of the arc does the indicator diameter take up?
        const indicatorPercentage = (indicatorRadius * 2) / length;

        // Calculate the percentage the indicator utilizes of the total value
        remainder = valueRange * indicatorPercentage;
      }

      return degreesToRadians(minAngle + (angleValue - remainder));
    };

    const innerArc = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(degreesToRadians(minAngle))
      .endAngle(calculateEndAngle)
      .cornerRadius(100);

    const indicatorRadius = (radius - innerRadius) / 2;

    const endAngleArc = arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .startAngle(d => calculateEndAngle(d, indicatorRadius))
      .endAngle(d => calculateEndAngle(d, indicatorRadius))
      .cornerRadius(100);

    let wrapper = selection.selectAll(CSS.getClassSelector('gauge-arc'));

    if (wrapper.size() === 0) {
      wrapper = selection.append('path');
    }

    wrapper
      .classed(CSS.getClassName('gauge-arc'), true)
      .attr('d', outerArc)
      .attr('transform', centerTransform(width, height));

    let value = selection
      .selectAll(CSS.getClassSelector('gauge-arc-value'))
      .data(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null));

    value.exit().remove();

    const newValue = value.enter().append('path');

    value = newValue.merge(value);

    value
      .classed(CSS.getClassName('gauge-arc-value'), true)
      .attr('d', innerArc)
      .attr('transform', `translate(${width / 2},${height / 2})`);

    let leadingIndicator = selection
      .selectAll(CSS.getClassSelector('gauge-leading-indicator'))
      .data(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null));

    leadingIndicator.exit().remove();

    const newLeadingIndicator = leadingIndicator.enter().append('circle');

    leadingIndicator = newLeadingIndicator.merge(leadingIndicator);

    const indicatorStrokeWidth = indicatorRadius / 1.95;

    leadingIndicator
      .attr('class', CSS.getClassName('gauge-leading-indicator'))
      .attr('stroke-width', indicatorStrokeWidth)
      .attr('r', indicatorRadius - indicatorStrokeWidth / 2)
      .attr('cx', d => endAngleArc.centroid(d)[0])
      .attr('cy', d => endAngleArc.centroid(d)[1])
      .attr('transform', centerTransform(width, height));

    let kpi = selection
      .selectAll(CSS.getClassSelector('gauge-kpi'))
      .data(this.seriesData[0].data.filter(d => !d.disabled && d.y !== null));

    kpi.exit().remove();

    const newKpi = kpi.enter().append('text');

    kpi = newKpi.merge(kpi);

    const kpiFontSize = innerRadius / 1.175;

    kpi
      .classed(CSS.getClassName('gauge-kpi'), true)
      .attr('transform', centerTransform(width, height))
      .style('font-size', `${kpiFontSize}px`)
      .text(d => d.y);

    if (options.gauge && options.gauge.delta) {
      let delta = selection
        .selectAll(CSS.getClassSelector('gauge-delta'))
        .data([options.gauge.delta.value]);

      delta.exit().remove();

      const newDelta = delta.enter().append('text');

      delta = newDelta.merge(delta);

      const deltaFontSize = kpiFontSize / 4;
      const { direction } = options.gauge.delta;
      const deltaClass = CSS.getClassName('gauge-delta');
      const directionClass = direction
        ? CSS.getClassName(`gauge-delta-${direction}`)
        : '';

      delta
        .attr('class', `${deltaClass} ${directionClass}`)
        .attr(
          'transform',
          `translate(${width / 2},${height / 2 + kpiFontSize / 1.6})`,
        )
        .style('font-size', `${deltaFontSize}px`)
        .text(d => d);
    }

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
