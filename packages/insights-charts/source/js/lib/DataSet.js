import moment from 'moment';
import clone from 'clone';
import helpers from '../helpers/charting';

class DataSet {
  constructor(data) {
    this.data = clone(data);

    this.validateSeries();
  }

  getGroups() {
    return this.data.series.filter(d => d.disabled !== true).map(d => d.label);
  }

  getGroupsByType(type) {
    return this.data.series.filter(d => d.disabled !== true && d.type === type).map(d => d.label);
  }

  getCategoryType() {
    return helpers.detectCategoryType(this.data.categories);
  }

  getCategories() {
    const type = this.getCategoryType();

    return this.data.categories.map((category) => {
      if (typeof category.label === 'undefined') {
        category = { label: category };
      }

      switch (type) {
        case 'date':
          category.label = moment(category.label);
          break;
        case 'number':
          if (helpers.isFloat(category.label)) {
            category.label = parseFloat(category.label);
          } else {
            category.label = parseInt(category.label, 10);
          }

          break;
        default:
          category.label = category.label;
      }

      return category;
    });
  }

  getDataByYAxis(axisIndex) {
    const i = axisIndex;

    if (this.seriesData === undefined) {
      this.getSeries();
    }

    return this.seriesData.filter(s => (
      (s.axis === i || (s.axis === undefined && i === 0)) && s.disabled !== true
    ));
  }

  getSeries() {
    const categories = this.getCategories();
    let series;

    series = this.data.series.map((s, index) => {
      s.seriesIndex = index;

      s.data = s.data.map((d, i) => {
        const category = categories[i];

        const datum = (typeof d === 'object' ? d : { x: category.label, y: d });

        datum.seriesIndex = index;
        datum.categoryIndex = i;
        datum.seriesLabel = s.label;
        datum.seriesType = s.type;
        datum.axis = s.axis || 0;
        datum.color = s.color || category.color;
        datum.formatter = s.formatter;

        return datum;
      });

      return s;
    });

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
