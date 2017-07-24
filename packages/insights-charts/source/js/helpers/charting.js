import moment from 'moment';

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

  getMaximumPoint(data, options, layout) {
    let maxPoint = { y: 0, y0: 0, x: 0 };

    data.forEach((s) => {
      s.data.forEach((d) => {
        if (layout === 'combination') {
          layout = options[d.seriesType].layout;
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

  detectCategoryType(categories) {
    const types = {};
    const rnumber = /^\s*\d+(\.\d*)?\s*$/;
    let highestNumber = 0;
    let highestKey = null;

    categories.forEach((d) => {
      if (d.label) {
        d = d.label;
      }

      if (d && d._isAMomentObject) { // eslint-disable-line no-underscore-dangle
        if (!types.date) {
          types.date = 0;
        }

        types.date += 1;
      } else if (helpers.isTimestamp(d) && moment(new Date(d)).isValid()) {
        if (!types.date) {
          types.date = 0;
        }

        types.date += 1;
      } else if (d.match && d.match(rnumber)) {
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
