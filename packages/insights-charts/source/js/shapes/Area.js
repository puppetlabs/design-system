import { area as d3Area } from 'd3-shape';

const Area = (x, y, data, dimensions, options) => {
  const isStacked = options.layout === 'stacked';

  const area = d3Area()
    .x(d => (x(d.x)))
    .y0((d) => {
      let yPos;
      if (isStacked) {
        if (d.y < 0 && d.y0 >= 0) {
          yPos = y(0);
        } else {
          yPos = y(d.y0);
        }
      } else {
        yPos = y.domain()[0] < 0 ? y(0) : dimensions.height;
      }

      return yPos;
    })
    .y1((d) => {
      let yPos;

      if (isStacked) {
        if (d.y < 0 && d.y0 > 0) {
          yPos = y(d.y);
        } else {
          yPos = y(d.y0 + d.y);
        }
      } else {
        yPos = y(d.y);
      }

      return yPos;
    });

  return area(data);
};

export default Area;
