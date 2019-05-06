import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Heading, Icon, Text } from '@puppet/react-components';

const propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
    parents: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.arrayOf(PropTypes.object),
    status: PropTypes.string,
  }).isRequired,
};

const WorkflowStepCard = ({ node }) => (
  <Card
    className={classNames(
      'rc-workflow-card',
      node.status && `rc-workflow-card-status-${node.status}`,
      node.parents &&
        node.parents.map(
          parent =>
            parent.status && `rc-workflow-card-parent-status-${parent.status}`,
        ),
      {
        'rc-workflow-has-children': node.children && node.children.length,
        'rc-workflow-has-parents': node.parents && node.parents.length,
      },
    )}
  >
    <div className="rc-workflow-card-container">
      <Text className="rc-workflow-label">{node.type || 'Action'}</Text>
      <Heading as="h4" className="rc-workflow-title">
        {node.id}
      </Heading>
    </div>
  </Card>
);

WorkflowStepCard.propTypes = propTypes;

export default WorkflowStepCard;
