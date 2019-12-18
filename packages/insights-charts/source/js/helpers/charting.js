import moment from 'moment';
import clone from 'clone';
import { min as d3Min, max as d3Max } from 'd3-array';
import formatters from './formatters';
import { POI_RADIUS, POI_SCALING_FACTOR, VIZ_TYPES } from '../constants';
/* eslint-disable import/no-cycle */
import ZScale from '../lib/scales/ZScale';

const helpers = {
  isTimestamp(str) {
    const res = [
      /^([0-9]{4}(-|\/)[0-9]{1,2}|[0-9]{1,2}(-|\/)[0-9]{4})$/,
      /^([0-9]{4}(-|\/)[0-9]{1,2}(-|\/)[0-9]{1,2}|[0-9]{1,2}(-|\/)[0-9]{1,2}(-|\/)[0-9]{4})$/,
      /^([0-9]{4}(-|\/)[0-9]{1,2}(-|\/)[0-9]{1,2}|[0-9]{1,2}(-|\/)[0-9]{1,2}(-|\/)[0-9]{4})( |T)[0-9]{2}:[0-9]{2}(:[0-9]{2})?\s*(PM|AM)?/,
    ];
    const len = res.length;
    let i;

    // Just to be safe...
    if (!str || !str.match) {
      return false;
    }

    for (i = 0; i < len; i += 1) {
      if (str.match(res[i])) {
        return true;
      }
    }

    return false;
  },

  stackData(data) {
    const columns = {};

    return data.map(s => {
      const yIndex = s.axis !== undefined ? s.axis : 0;

      if (typeof columns[yIndex] === 'undefined') {
        columns[yIndex] = {};
      }

      s.data.map(d => {
        const revisedD = d;

        if (typeof columns[yIndex][revisedD.x] === 'undefined') {
          columns[yIndex][revisedD.x] = {
            y0Positive: revisedD.y0,
            y0Negative: revisedD.y0,
          };
        }

        if (revisedD.y >= 0) {
          revisedD.y0 = columns[yIndex][revisedD.x].y0Positive;
          columns[yIndex][revisedD.x].y0Positive += revisedD.y || 0;
        } else if (revisedD.y < 0) {
          revisedD.y0 = columns[yIndex][revisedD.x].y0Negative;
          columns[yIndex][revisedD.x].y0Negative += revisedD.y || 0;
        }

        return revisedD;
      });

      return s;
    });
  },

  getColumnLength(options, y, d, yAxisIndex = 0) {
    const axisOptions = options.axis || {};
    const isYReversed = axisOptions.y
      ? options.axis.y[yAxisIndex].reversed
      : false;
    const isStacked = options.layout === 'stacked';
    const axisMin = isYReversed ? y.domain()[1] : y.domain()[0];

    if (d.y === null) {
      return 0;
    }

    const datumMin = d.y0 || 0;
    const datumMax = d.y;

    const columnMin = datumMin < axisMin ? axisMin : datumMin;
    const lowValue = y(columnMin);
    const highValue = isStacked ? y(columnMin + datumMax) : y(datumMax);

    return Math.abs(highValue - lowValue);
  },

  getYPosition(options, y, d, yAxisIndex = 0) {
    const axisOptions = options.axis || {};
    const orientation = axisOptions.x ? axisOptions.x.orientation : 'bottom';
    const isYReversed = axisOptions.y
      ? axisOptions.y[yAxisIndex].reversed
      : false;
    const isStacked = options.layout === 'stacked';
    const isRotated = orientation === 'left' || orientation === 'right';
    const axisMin = isYReversed ? y.domain()[1] : y.domain()[0];

    const datumMin = d.y0;
    const datumMax = d.y;

    const columnMin = datumMin < axisMin ? axisMin : datumMin;

    let yPos;

    // if the chart is a column chart then the yPos is pixels from the top
    // if the chart is a bar chart then the yPos is pixels from the left
    if ((datumMax > 0 && !isRotated) || (datumMax < 0 && isRotated)) {
      yPos = isStacked ? y(columnMin + datumMax) : y(datumMax);
    } else {
      yPos = y(columnMin);
    }

    if (isYReversed) {
      yPos -= this.getColumnLength(options, y, d, yAxisIndex);
    }

    return yPos;
  },

  getFormattedValue(optionFormatter, value) {
    let formatter = d => d;

    if (
      optionFormatter &&
      Object.keys(formatters).indexOf(optionFormatter) >= 0
    ) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    return formatter(value);
  },

  isStackable(type) {
    let stackable = true;

    if (type === VIZ_TYPES.LINE || type === VIZ_TYPES.SCATTER) {
      stackable = false;
    }

    return stackable;
  },

  getSeriesIndicatorOpacity(datum, options) {
    const { type } = options;
    let opacity = null;

    if (type === VIZ_TYPES.COMBINATION) {
      opacity = options[datum.type] && options[datum.type].opacity;
    } else if (options[type] && options[type].opacity) {
      opacity = options[type] && options[type].opacity;
    }

    return opacity;
  },

  getPlotOptions(type, options, data = []) {
    const stackable = this.isStackable(type);
    const plotOptions = options && options[type] ? clone(options[type]) : {};

    if (data.length <= 1) {
      plotOptions.layout = 'normal';
    } else if (data.length > 1 && !plotOptions.layout && stackable) {
      plotOptions.layout = 'stacked';
    }

    return plotOptions;
  },

  getMaximumPoint(data, options, layout) {
    let maxPoint = { y: 0, y0: 0, x: 0 };
    let revisedLayout = layout;

    data.forEach(s => {
      s.data.forEach(d => {
        if (
          revisedLayout === VIZ_TYPES.COMBINATION &&
          options[d.seriesType] &&
          options[d.seriesType].layout
        ) {
          ({ revisedLayout } = options[d.seriesType]);
        }

        if (
          revisedLayout === 'stacked' &&
          d.y + d.y0 > maxPoint.y + maxPoint.y0
        ) {
          maxPoint = d;
        } else if (revisedLayout !== 'stacked' && d.y > maxPoint.y) {
          maxPoint = d;
        }
      });
    });

    return maxPoint;
  },

  getBubbleRadius(datum, z, width, height) {
    const defaultRadius = POI_RADIUS;
    const relativeAxisLength = Math.min(width, height);
    let bubbleRadius = Math.abs(datum) * relativeAxisLength;

    if (bubbleRadius < defaultRadius) {
      bubbleRadius = defaultRadius;
    }

    return z(datum === null ? defaultRadius : bubbleRadius);
  },

  getMaxBubbleRadius(data) {
    let numberOfPoints = 0;

    data.forEach(series => {
      numberOfPoints += series.data.length;
    });

    return POI_SCALING_FACTOR / Math.sqrt(numberOfPoints);
  },

  getAdjustedLimit(props) {
    const { data, s, axis, limitType, dimensions, options } = props;
    const isYAxis = axis === 'y';
    const isXAxis = axis === 'x';

    const max = d3Max(
      s.data.filter(d => d[axis] !== null),
      d => d[axis],
    );
    let min = d3Min(
      s.data.filter(d => d[axis] !== null),
      d => d[axis],
    );

    // We do this to account for using .nice on y-axis
    if (isYAxis) {
      min = min > 0 ? 0 : min;
    }

    const zScale = new ZScale(data, dimensions);
    const z = zScale.generate();

    const radius = d =>
      helpers.getBubbleRadius(d.z, z, dimensions.width, dimensions.height);

    let axisLengths = [dimensions.height, dimensions.width];
    if (
      isYAxis &&
      (options.orientation === 'bottom' || options.orientation === 'top')
    ) {
      axisLengths = axisLengths.reverse();
    } else if (
      isXAxis &&
      (options.orientation === 'right' || options.orientation === 'left')
    ) {
      axisLengths = axisLengths.reverse();
    }

    const relativeAxisLength = isYAxis ? axisLengths[0] : axisLengths[1];
    // Inner padding
    const buffer = Math.abs(max - min) * 0.2;

    let adjustedSeries;
    let point;

    if (limitType === 'max') {
      adjustedSeries = s.data.map(d => {
        let adjusted = d[axis] + radius(d) / (relativeAxisLength / (max - min));

        adjusted += buffer;

        return adjusted;
      });

      point = d3Max(adjustedSeries);
    } else if (limitType === 'min') {
      adjustedSeries = s.data.map(d => {
        let adjusted =
          d[axis] - Math.abs(radius(d) / (relativeAxisLength / (max - min)));

        adjusted -= buffer;

        return adjusted;
      });

      point = d3Min(adjustedSeries);
    }

    return point;
  },

  isStringANumber(value) {
    const rnumber = /^\s*\d+(\.\d*)?\s*$/;
    let result = false;

    if (typeof value === 'string' && value.match) {
      result = value.match(rnumber);
    }

    return result;
  },

  validatedNumber(value) {
    let n = NaN;

    if (this.isStringANumber(value)) {
      n = Number(value);
    } else if (Number(value) === value) {
      n = value;
    }

    return n;
  },

  isInt(d) {
    const n = this.validatedNumber(d);
    let isInt = false;

    // eslint-disable-next-line
    if (!isNaN(n)) {
      isInt = n % 1 === 0;
    }

    return isInt;
  },

  isFloat(d) {
    const n = this.validatedNumber(d);
    let isFloat = false;

    // eslint-disable-next-line
    if (!isNaN(n)) {
      isFloat = n % 1 !== 0;
    }

    return isFloat;
  },

  detectScaleType(categories) {
    const types = {};
    let highestNumber = 0;
    let highestKey = null;

    categories.forEach(d => {
      let revisedD = d;

      if (revisedD.label) {
        revisedD = revisedD.label;
      }

      if (
        (revisedD && revisedD._isAMomentObject) || // eslint-disable-line no-underscore-dangle
        (helpers.isTimestamp(revisedD) &&
          moment(new Date(revisedD)).isValid()) ||
        revisedD instanceof Date
      ) {
        if (!types.date) {
          types.date = 0;
        }

        types.date += 1;
      } else if (this.isInt(revisedD) || this.isFloat(revisedD)) {
        if (!types.number) {
          types.number = 0;
        }

        types.number += 1;
      } else {
        if (!types.ordinal) {
          types.ordinal = 0;
        }

        types.ordinal += 1;
      }
    });

    Object.keys(types).forEach(type => {
      if (typeof type === 'string') {
        if (types[type] > highestNumber) {
          highestNumber = types[type];
          highestKey = type;
        }
      }
    });

    return highestKey;
  },
};

export default helpers;
