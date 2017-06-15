import { curveCardinal, line as d3Line } from 'd3-shape';

const Line = (x, y, data, options) => {
  const isStacked = options.layout === 'stacked';
  const type = options.type;

  const line = d3Line()
    .x(d => (x(d.x)))
    .y((d) => {
      let result;

      if (isStacked) {
        result = y(d.y0 + d.y);
      } else {
        result = y(d.y);
      }

      return result;
    });

  if (type === 'spline') {
    line.curve(curveCardinal);
  }

  return line(data);
};

export default Line;
