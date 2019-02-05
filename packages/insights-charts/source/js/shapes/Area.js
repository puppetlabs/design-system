import { curveCatmullRom, area as d3Area } from 'd3-shape';

const Area = (x, y, data, dimensions, options) => {
  const isStacked = options.layout === 'stacked';
  const { spline } = options;
  let revisedData = data;

  const area = d3Area()
    .x(d => {
      let result = x(d.x);

      if (x.bandwidth) {
        result += x.bandwidth() / 2;
      }

      return result;
    })
    .y0(d => {
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
    .y1(d => {
      let yPos;

      if (isStacked) {
        if (d.y < 0 && d.y0 > 0) {
          yPos = y(d.y || 0);
        } else {
          yPos = y(d.y0 + (d.y || 0));
        }
      } else {
        yPos = y(d.y);
      }

      return yPos;
    });

  if (spline) {
    area.curve(curveCatmullRom);
  }

  if (!isStacked) {
    revisedData = data.filter(d => d.y !== null);
  }

  return area(revisedData);
};

export default Area;
