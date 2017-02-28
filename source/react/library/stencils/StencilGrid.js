import React from 'react';
import GridBlock from './GridBlock';

const propTypes = {
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

class StencilGrid extends React.Component {

  constructor(props) {
    super(props);
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

    blocks.forEach((block) => {
      const coords = this.getCoords(block.layout);
      gridBlocks.push(<GridBlock coords={ coords } type={ block.type } />);
    });

    return gridBlocks;
  }

  render() {
    const components = this.props.view.configuration.components;
    const settings = this.props.settings;
    const gridBlocks = this.getGridBlocks(components);

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
