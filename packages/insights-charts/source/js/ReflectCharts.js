import Area from './charts/Area';
import Column from './charts/Column';
import Line from './charts/Line';
import Pie from './charts/Pie';

class ReflectChart {
  constructor(type, elem, data = {}, options = {}) {
    this.type = type;

    this.setup(elem, data, options);
  }

  getChart() {
    const type = this.type;
    let chart;

    switch (type) {
      case 'area':
        chart = Area;
        break;
      case 'line':
        chart = Line;
        break;
      case 'Column':
        chart = Column;
        break;
      case 'pie':
        chart = Pie;
        break;
      default:
        break;
    }

    return chart;
  }

  setup(elem, data, options) {
    const Chart = this.getChart();

    if (!Chart) {
      throw new Error('Invalid chart type');
    }

    const chart = new Chart(elem, data, options);

    chart.render();
  }
}

export default ReflectChart;
