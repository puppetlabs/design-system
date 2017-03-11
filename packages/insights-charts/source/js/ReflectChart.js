import Area from './visualizations/Area';
import Bar from './visualizations/Bar';
import Line from './visualizations/Line';
import Pie from './visualizations/Pie';

class ReflectChart {
  constructor(type, selector, options) {
    this.render(type, selector, options);
  }

  classifyType() {
    const type = this.type;
    let Visualization;

    switch (type) {
      case 'area':
        Visualization = Area;
        break;
      case 'line':
        Visualization = Line;
        break;
      case 'bar':
        Visualization = Bar;
        break;
      case 'pie':
        Visualization = Pie;
        break;
      default:
        break;
    }

    return Visualization;
  }

  render(type, selector, options) {
    const elem = document.getElementById(selector);

    elem.innerHTML = '';

    const Visualization = this.classifyType(type);

    if (!Visualization) {
      throw new Error(`Invalid chart type: ${type}`);
    }

    const visualization = new Visualization(selector, options);

    visualization.render();
  }
}

export default ReflectChart;
