import moment from 'moment';
import clone from 'clone';
import helpers from '../helpers/charting';

class DataSet {
  constructor(data) {
    this.data = clone(data);

    this.validateSeries();
  }

  getGroups() {
    return this.data.series
      .filter(d => (d.disabled !== true && d.label !== undefined))
      .map(d => d.label);
  }

  getGroupsByType(type) {
    return this.data.series
      .filter(d => d.disabled !== true && d.type === type && d.label !== undefined)
      .map(d => d.label);
  }

  getCategoryType() {
    return helpers.detectScaleType(this.data.categories);
  }

  getCategories() {
    const dataSet = this;
    const type = this.getCategoryType();

    return this.data.categories.map((category, index) => {
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

      category.isTargetable = function () {
        if (dataSet.seriesData === undefined) {
          dataSet.getSeries();
        }

        if (typeof this.targetable === 'undefined') {
          this.targetable = dataSet.seriesData.some(s => s.data[index].y !== null);
        }

        return this.targetable;
      };

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

    const series = this.data.series.map((s, index) => {
      s.seriesIndex = index;

      s.data = s.data.map((d, i) => {
        const category = categories[i];

        const datum = (typeof d === 'object' && d !== null ? d : { x: category.label, y: d, y0: 0 });

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
