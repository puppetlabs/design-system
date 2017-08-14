import { curveCatmullRom, line as d3Line } from 'd3-shape';

const Line = (x, y, data = [], options = {}) => {
  const isStacked = options.layout === 'stacked';
  const spline = options.spline;

  const line = d3Line()
    .x((d) => {
      let result = x(d.x);

      if (x.bandwidth) {
        result += x.bandwidth() / 2;
      }

      return result;
    })
    .y((d) => {
      let result;

      if (isStacked) {
        result = y(d.y0 + d.y);
      } else {
        result = y(d.y);
      }

      return result;
    });

  if (spline) {
    line.curve(curveCatmullRom);
  }

  return line(data);
};

export default Line;
