import React from 'react';
import PropTypes from 'prop-types';
import { generateGraphLayout } from 'util/graph';
import WorkflowStepCard from '../WorkflowStepCard';
import Connectors from '../Connectors';

const propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      parents: PropTypes.arrayOf(PropTypes.object),
      children: PropTypes.arrayOf(PropTypes.object),
      status: PropTypes.string,
    }),
  ),
};
const defaultProps = {
  nodes: [],
};

const Workflow = ({ nodes }) => {
  const dag = generateGraphLayout(nodes);

  return (
    <div className="rc-workflow">
      {dag.edges.length > 0 && <Connectors {...dag} />}
      {Object.entries(dag.nodes).map(([id, { x, y, ...node }]) => (
        <div
          key={id}
          style={{
            gridColumnStart: x,
            gridColumnEnd: x + 1,
            gridRowStart: y,
            gridRowEnd: y + 1,
          }}
        >
          <WorkflowStepCard node={node} />
        </div>
      ))}
    </div>
  );
};

Workflow.propTypes = propTypes;
Workflow.defaultProps = defaultProps;

export default Workflow;
