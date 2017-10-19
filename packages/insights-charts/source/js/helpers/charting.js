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

  getColumnLength(options, dimensions, y, d) {
    const isStacked = options.layout === 'stacked';
    const isHorizontal = options.axis.x.orientation === 'left' || options.axis.x.orientation === 'right';
    const height = dimensions.height;
    let val = 0;

    if (isStacked) {
      val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : Math.abs(y(d.y0) - y(d.y0 + d.y));
    } else if (isHorizontal) {
      val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : y(d.y);
    } else {
      val = y.domain()[0] < 0 ? Math.abs(y(d.y) - y(0)) : height - y(d.y);
    }

    return val;
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

  getPlotOptions(type, options, data) {
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

  detectCategoryType(categories) {
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

  detectScaleType(domain, chartType) {
    const types = {};
    const rnumber = /^\s*\d+(\.\d*)?\s*$/;
    let highestNumber = 0;
    let highestKey = null;

    if (chartType === 'column' || chartType === 'bar' || chartType === 'combination') {
      highestKey = 'ordinal';
    } else {
      domain.forEach((d) => {
        if (d && d._isAMomentObject) { // eslint-disable-line no-underscore-dangle
          if (!types.time) {
            types.time = 0;
          }

          types.time += 1;
        } else if (helpers.isTimestamp(d) && moment(new Date(d)).isValid()) {
          if (!types.time) {
            types.time = 0;
          }

          types.time += 1;
        } else if (d.toString().match(rnumber)) {
          if (!types.linear) {
            types.linear = 0;
          }

          types.linear += 1;
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
    }

    return highestKey;
  },
};

export default helpers;
