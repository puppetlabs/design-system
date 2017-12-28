import moment from 'moment';
import clone from 'clone';
import formatters from './formatters';

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

    return data.map((s) => {
      const yIndex = s.axis !== undefined ? s.axis : 0;

      if (typeof columns[yIndex] === 'undefined') {
        columns[yIndex] = {};
      }

      s.data.map((d) => {
        if (typeof columns[yIndex][d.x] === 'undefined') {
          columns[yIndex][d.x] = {
            y0Positive: d.y0,
            y0Negative: d.y0,
          };
        }

        if (d.y >= 0) {
          d.y0 = columns[yIndex][d.x].y0Positive;
          columns[yIndex][d.x].y0Positive += d.y || 0;
        } else if (d.y < 0) {
          d.y0 = columns[yIndex][d.x].y0Negative;
          columns[yIndex][d.x].y0Negative += d.y || 0;
        }

        return d;
      });

      return s;
    });
  },

  getColumnLength(options, y, d, yAxisIndex = 0) {
    const axisOptions = options.axis || {};
    const isYReversed = axisOptions.y ? options.axis.y[yAxisIndex].reversed : false;
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
    const isYReversed = axisOptions.y ? axisOptions.y[yAxisIndex].reversed : false;
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
    let formatter = d => (d);

    if (optionFormatter && Object.keys(formatters).indexOf(optionFormatter) >= 0) {
      formatter = formatters[optionFormatter];
    } else if (optionFormatter && typeof optionFormatter === 'function') {
      formatter = optionFormatter;
    }

    return formatter(value);
  },

  isStackable(type) {
    let stackable = true;

    if (type === 'line' || type === 'scatter') {
      stackable = false;
    }

    return stackable;
  },

  getSeriesIndicatorOpacity(datum, options) {
    const type = options.type;
    let opacity = null;

    if (type === 'combination') {
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

    data.forEach((s) => {
      s.data.forEach((d) => {
        if (layout === 'combination') {
          layout = options[d.seriesType] && options[d.seriesType].layout;
        }

        if (layout === 'stacked' && ((d.y + d.y0) > (maxPoint.y + maxPoint.y0))) {
          maxPoint = d;
        } else if (layout !== 'stacked' && d.y > maxPoint.y) {
          maxPoint = d;
        }
      });
    });

    return maxPoint;
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

    if (!isNaN(n)) {
      isInt = n % 1 === 0;
    }

    return isInt;
  },

  isFloat(d) {
    const n = this.validatedNumber(d);
    let isFloat = false;

    if (!isNaN(n)) {
      isFloat = n % 1 !== 0;
    }

    return isFloat;
  },

  detectScaleType(categories) {
    const types = {};
    let highestNumber = 0;
    let highestKey = null;

    categories.forEach((d) => {
      if (d.label) {
        d = d.label;
      }

      if (
        (d && d._isAMomentObject) || // eslint-disable-line no-underscore-dangle
        (helpers.isTimestamp(d) && moment(new Date(d)).isValid()) ||
        d instanceof Date
      ) {
        if (!types.date) {
          types.date = 0;
        }

        types.date += 1;
      } else if (this.isInt(d) || this.isFloat(d)) {
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

    Object.keys(types).forEach((type) => {
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
