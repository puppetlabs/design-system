import React from 'react';
import PropTypes from 'prop-types';
import { generateGraphLayout } from 'util/graph';
import WorkflowCard from '../WorkflowCard';
import Connectors from '../Connectors';

const propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  const steps =
    (nodes &&
      Array.isArray(nodes) &&
      nodes.map(step => ({
        id: step.name,
        ...step,
        needs:
          step.needs && (Array.isArray(step.needs) ? step.needs : [step.needs]),
      }))) ||
    [];
  const dag = generateGraphLayout(steps);

  return (
    <div className="rc-workflow">
      {dag.edges.length > 0 ? <Connectors {...dag} /> : <p>Empty workflow</p>}
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
