import React from 'react';
import GridBlock from './GridBlock';

const propTypes = {
  /** A view configuration from the Reflect API */
  view: React.PropTypes.object,
  settings: React.PropTypes.object,
};

const defaultProps = {
  settings: {
    cols: 12,
    width: 270,
    margin: 8,
    height: 170,
    rowHeight: 25,
  },
};

const DEFAULT_TYPE = 'chart';

const staticView = [
  {
    type: 'bars',
    layout: { w: 12, h: 2, x: 0, y: 0 },
  },
  {
    type: 'timeseries',
    layout: { w: 12, h: 2, x: 0, y: 2 },
  },
  {
    type: 'donut',
    layout: { w: 12, h: 2, x: 0, y: 4 },
  },
];

const validateBlocks = (blocks) => {
  let valid = true;
  let x;
  let y;

  blocks.forEach((block) => {
    const layout = typeof block.layout === 'undefined';
    if (!layout) {
      x = typeof block.layout.x === 'undefined';
      y = typeof block.layout.y === 'undefined';
    }

    if (layout || y || x) {
      valid = false;
    }
  });

  return valid;
};

/**
 * `StencilGrid` is used to display a stencil of one of a Reflect view.
 *
 * @example ../../../../docs/StencilGrid.md
 */

class StencilGrid extends React.Component {
  getType(type) {
    const known = ['bars', 'timeseries', 'donut', 'datagrid', 'kpi', 'scatter'];

    if (known.indexOf(type) < 0) {
      type = DEFAULT_TYPE;
    }

    return type;
  }

  getCoords({ x, y, w, h }) {
    const settings = this.props.settings;

    return {
      x: ((settings.width / settings.cols) * x) + (settings.margin / 2),
      y: (settings.rowHeight * y) + (settings.margin * (y + 0.5)),
      h: (settings.rowHeight * h) + (settings.margin * (h - 1)),
      w: ((settings.width / settings.cols) * w) - settings.margin,
    };
  }

  getGridBlocks(blocks) {
    const gridBlocks = [];

    blocks.forEach((block, i) => {
      const coords = this.getCoords(block.layout);
      const type = this.getType(block.type);

      gridBlocks.push(<GridBlock key={ `grid-block-${i}` } coords={ coords } type={ type } />);
    });

    return gridBlocks;
  }

  render() {
    const components = this.props.view.configuration.components;
    const settings = this.props.settings;
    const gridBlocks = validateBlocks(components) ?
      this.getGridBlocks(components) : this.getGridBlocks(staticView);

    return (
      <div className="rc-grid-div">
        <svg className="rc-stencil-grid" width={ settings.width } height={ settings.height } xmlns="http://www.w3.org/2000/svg">
          { gridBlocks }
        </svg>
      </div>
    );
  }
}

StencilGrid.propTypes = propTypes;
StencilGrid.defaultProps = defaultProps;

export default StencilGrid;
