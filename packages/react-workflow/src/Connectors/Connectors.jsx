import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CARD_WIDTH = 240;
const CARD_HEIGHT = 75;
const HORIZONTAL_GUTTER = 24;
const VERTICAL_GUTTER = 48;
const ARROW_SIZE = 4;

function createPath({ startX, startY, endX, endY }) {
  const deltaX = (endX - startX) * 0.25;
  const deltaY = (endY - startY) * 0.25;
  const delta = deltaY < Math.abs(deltaX) ? deltaY : Math.abs(deltaX);
  const isRightward = startX < endX;
  const arc1 = isRightward ? 0 : 1;
  const arc2 = isRightward ? 1 : 0;

  // Define connector path with: Downward segment, bend, horizontal segment,
  // another bend, and the final downward segment
  return `M${startX} ${startY} V${startY +
    delta} A${delta} ${delta} 0 0 ${arc1} ${startX +
    delta * Math.sign(deltaX)} ${startY + 2 * delta} H${endX -
    delta * Math.sign(deltaX)} A${delta} ${delta} 0 0 ${arc2} ${endX} ${startY +
    3 * delta} V${endY - 1}`;
}

function createArrow({ endX, endY }) {
  return `M${endX - ARROW_SIZE} ${endY - ARROW_SIZE - 1} L ${endX} ${endY -
    1} L ${endX + ARROW_SIZE} ${endY - ARROW_SIZE - 1}`;
}

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  nodes: PropTypes.shape({}).isRequired,
  edges: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Connectors = ({ width, height, nodes, edges }) => {
  const svgWidth = CARD_WIDTH * width + HORIZONTAL_GUTTER * (width - 1);
  const svgHeight = CARD_HEIGHT * height + VERTICAL_GUTTER * (height - 1);

  const connectors = edges.map(edge => ({
    key: `${edge.start}-${edge.end}`,
    startX:
      nodes[edge.start].x * CARD_WIDTH +
      HORIZONTAL_GUTTER * (nodes[edge.start].x - 1) -
      CARD_WIDTH / 2,
    startY:
      nodes[edge.start].y * CARD_HEIGHT +
      VERTICAL_GUTTER * (nodes[edge.start].y - 1),
    endX:
      nodes[edge.end].x * CARD_WIDTH +
      HORIZONTAL_GUTTER * (nodes[edge.end].x - 1) -
      CARD_WIDTH / 2,
    endY:
      nodes[edge.end].y * CARD_HEIGHT +
      VERTICAL_GUTTER * (nodes[edge.end].y - 1) -
      CARD_HEIGHT,
  }));

  return (
    <svg className="rc-workflow-connectors" width={svgWidth} height={svgHeight}>
      {connectors.map(connector => (
        <Fragment key={connector.key}>
          <path className="rc-workflow-connector" d={createPath(connector)} />
          <path
            className="rc-workflow-connector-arrow"
            d={createArrow(connector)}
          />
        </Fragment>
      ))}
    </svg>
  );
};

Connectors.propTypes = propTypes;

export default Connectors;
