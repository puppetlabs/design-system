import CSS from '../helpers/css';
import Line from '../shapes/Line';

class Lines {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.options = options;
  }

  setSelection(selection) {
    this.selection = selection;
  }

  render(selection) {
    const { x, y, options } = this;

    this.setSelection(selection);

    selection.selectAll(CSS.getClassSelector('line-path')).remove();

    const lines = selection
      .append('path')
      .attr('class', CSS.getClassName('line-path'))
      .attr('style', d => (d.color ? `stroke: ${d.color};` : null))
      .attr('d', d => (Line(x, y, d.data, options)));

    return lines;
  }

  update(x, y, options) {
    this.x = x;
    this.y = y;
    this.options = options;

    this.render(this.selection);
  }
}

export default Lines;
