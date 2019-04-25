import React from 'react';
import PropTypes from 'prop-types';
import { generateGraphLayout } from 'util/graph';
import WorkflowCard from '../WorkflowCard';
import Connectors from '../Connectors';

const propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      needs: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
  ),
};
const defaultProps = {
  nodes: [],
};

const Workflow = ({ nodes }) => {
  const dag = generateGraphLayout(nodes);
  console.log(dag);

  return (
    <div className="rc-workflow">
      {(dag.edges.length > 0) && <Connectors {...dag} />}
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
          <WorkflowCard node={node} />
        </div>
      ))}
    </div>
  );
};

Workflow.propTypes = propTypes;
Workflow.defaultProps = defaultProps;

export default Workflow;
