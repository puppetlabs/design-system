import clone from 'clone';
import moment from 'moment';
import helpers from '../helpers/charting';

class DataSet {
  constructor(data, options = {}) {
    this.data = clone(data);
    this.options = options;

    this.validateSeries();
  }

  getGroups() {
    return this.data.series.filter(d => d.disabled !== true).map(d => d.label);
  }

  getCategories() {
    const type = helpers.detectCategoryType(this.data.categories);

    return this.data.categories.map((category) => {
      let result;

      switch (type) {
        case 'date':
          result = moment(category);
          break;
        case 'number':
          result = parseInt(category, 10);
          break;
        default:
          result = category;
      }

      return result;
    });
  }

  getDataByYAxis(axisIndex) {
    const i = axisIndex;

    return this.seriesData.filter(s => (
      (s.axis === i || (s.axis === undefined && i === 0)) && s.disabled !== true
    ));
  }

  getSeries(idx) {
    const categories = this.getCategories();
    const options = this.options;
    let series;

    series = this.data.series.map((s, index) => {
      s.seriesIndex = index;

      s.data = s.data.map((d, i) => {
        const datum = (typeof d === 'object' ? d : { x: categories[i], y: d });

        datum.seriesIndex = index;
        datum.axis = s.axis || 0;
        datum.seriesLabel = s.label;
        datum.seriesColor = s.color;
        datum.formatter = s.formatter;

        return datum;
      });

      return s;
    });

    if (options.layout === 'stacked') {
      const setupStack = function (originalSeries) {
        const columns = {};

        originalSeries.forEach((s) => {
          if (s.disabled !== true) {
            const yIndex = s.axis !== undefined ? s.axis : 0;

            if (typeof columns[yIndex] === 'undefined') {
              columns[yIndex] = {};
            }

            s.data.forEach((d) => {
              if (typeof columns[yIndex][d.x] === 'undefined') {
                columns[yIndex][d.x] = {
                  y0Positive: 0,
                  y0Negative: 0,
                };
              }

              if (d.y >= 0) {
                d.y0 = columns[yIndex][d.x].y0Positive;
                columns[yIndex][d.x].y0Positive += d.y;
              } else if (d.y < 0) {
                d.y0 = columns[yIndex][d.x].y0Negative;
                columns[yIndex][d.x].y0Negative += d.y;
              }
            });
          }
        });

        return originalSeries;
      };

      series = setupStack(series);
    }

    if (typeof idx !== 'undefined') {
      series = this.data.series[idx];
    }

    this.seriesData = series;

    return series;
  }

  validateSeries() {
    this.data.series.forEach((s) => {
      if (s.data.length !== this.data.categories.length) {
        throw new Error('The length of each data object needs to equal the length of categories');
      }
    });
  }
}

export default DataSet;
