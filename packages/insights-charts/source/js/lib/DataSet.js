import moment from 'moment';
import clone from 'clone';
import helpers from '../helpers/charting';

class DataSet {
  constructor(data) {
    this.data = clone(data);

    this.zoomCategories = [];

    this.validateSeries();
  }

  setZoomCategories(categories = []) {
    this.zoomCategories = categories;
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
    const categories = this.data.categories;
    const zoomCategories = this.zoomCategories || [];
    const newCategories = [];

    categories.forEach((category, index) => {
      if (
        zoomCategories.length === 0 ||
        (zoomCategories.length > 0 && index >= zoomCategories[0] && index <= zoomCategories[1])
      ) {
        if (typeof category.label === 'undefined') {
          category = { label: category };
        }

        category.categoryIndex = index;

        switch (type) {
          case 'date':
            category.label = moment(category.label);
            break;
          case 'number':
            if (helpers.isFloat(category.label)) {
              category.label = parseFloat(category.label);
            } else if (helpers.isInt(category.label)) {
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
            this.targetable = dataSet.seriesData
              .some((s) => {
                const dataPoints = s.data.filter(d => d.categoryIndex === category.categoryIndex);

                return dataPoints.some(d => d.y !== null);
              });
          }

          return this.targetable;
        };

        newCategories.push(category);
      }
    });

    return newCategories;
  }

  getDataByYAxis(axisIndex) {
    const i = axisIndex;

    this.getSeries();

    return this.seriesData.filter(s => (
      (s.axis === i || (s.axis === undefined && i === 0)) && s.disabled !== true
    ));
  }

  getSeries() {
    const categories = this.getCategories();
    const series = [];

    this.data.series.forEach((s, index) => {
      const newSeries = clone(s);

      newSeries.seriesIndex = index;
      newSeries.data = [];

      categories.forEach((category) => {
        const d = s.data[category.categoryIndex];
        const datum = (typeof d === 'object' && d !== null ? d : { y: d });

        datum.x = datum.x ? datum.x : category.label;
        datum.y0 = datum.y0 ? datum.y0 : 0;
        datum.seriesIndex = index;
        datum.categoryIndex = category.categoryIndex;
        datum.seriesLabel = s.label;
        datum.seriesType = s.type;
        datum.axis = s.axis || 0;
        datum.color = s.color || category.color;
        datum.formatter = s.formatter;

        newSeries.data.push(datum);
      });

      series.push(newSeries);
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
