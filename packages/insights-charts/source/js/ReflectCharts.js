import Area from './visualizations/Area';
import Column from './visualizations/Column';
import Line from './visualizations/Line';
import Pie from './visualizations/Pie';

class ReflectChart {
  constructor(type, elem, data = {}, options = {}) {
    this.type = type;

    this.setup(elem, data, options);
  }

  getVisualization() {
    const type = this.type;
    let Visualization;

    switch (type) {
      case 'area':
        Visualization = Area;
        break;
      case 'line':
        Visualization = Line;
        break;
      case 'Column':
        Visualization = Column;
        break;
      case 'pie':
        Visualization = Pie;
        break;
      default:
        break;
    }

    return Visualization;
  }

  setup(elem, data, options) {
    const Visualization = this.getVisualization();

    if (!Visualization) {
      throw new Error('Invalid chart type');
    }

    const visualization = new Visualization(elem, data, options);

    visualization.render();
  }
}

export default ReflectChart;
