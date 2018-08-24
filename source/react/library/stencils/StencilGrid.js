import PropTypes from 'prop-types';
import React from 'react';
import GridBlock from './GridBlock';

const propTypes = {
  /** A view configuration from the Reflect API */
  view: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({
    cols: PropTypes.number,
    width: PropTypes.number,
    margin: PropTypes.number,
    height: PropTypes.number,
    rowHeight: PropTypes.number,
  }),
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

const validateBlocks = blocks => {
  let valid = true;
  let x;
  let y;

  blocks.forEach(block => {
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

const getType = type => {
  const types = {
    kpi: 'kpi',
    bar: 'column',
    bars: 'column',
    area: 'area',
    line: 'line',
    text: 'text',
    donut: 'donut',
    pie: 'donut',
    timeseries: 'timeseries',
    summary: 'summary',
    scatter: 'scatter',
    datagrid: 'datagrid',
    combination: 'combination',
  };
  let vizType;

  vizType = types[type];

  if (!vizType) {
    vizType = DEFAULT_TYPE;
  }

  return vizType;
};

/**
 * `StencilGrid` is used to display a stencil of one of a Reflect view.
 */

class StencilGrid extends React.Component {
  getCoords({ x, y, w, h }) {
    const { settings } = this.props;

    return {
      x: (settings.width / settings.cols) * x + settings.margin / 2,
      y: settings.rowHeight * y + settings.margin * (y + 0.5),
      h: settings.rowHeight * h + settings.margin * (h - 1),
      w: (settings.width / settings.cols) * w - settings.margin,
    };
  }

  getGridBlocks(blocks) {
    const gridBlocks = [];

    blocks.forEach((block, i) => {
      const coords = this.getCoords(block.layout);
      const type = getType(block.type);
      const key = `grid-block-${i}`;

      gridBlocks.push(<GridBlock key={key} coords={coords} type={type} />);
    });

    return gridBlocks;
  }

  render() {
    const { view, settings: settingsProp } = this.props;
    const components = view.configuration.components || [];
    const settings = settingsProp;
    const { height, width } = settings;
    const styles = { height, width };
    const gridBlocks = validateBlocks(components)
      ? this.getGridBlocks(components)
      : this.getGridBlocks(staticView);

    return (
      <div className="rc-grid-div" style={styles}>
        <svg
          className="rc-stencil-grid"
          width={settings.width}
          height={settings.height}
          xmlns="http://www.w3.org/2000/svg"
        >
          {gridBlocks}
        </svg>
      </div>
    );
  }
}

StencilGrid.propTypes = propTypes;
StencilGrid.defaultProps = defaultProps;

export default StencilGrid;
