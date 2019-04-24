import React from 'react';
import PropTypes from 'prop-types';
import { Card, Heading, Icon, Text } from '@puppet/react-components';
import './WorkflowCard.scss';

const propTypes = {
  children: PropTypes.node,
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  children: null,
};

const WorkflowCard = ({ node, children }) => (
  <Card className="rc-workflow-card">
    <div className="rc-workflow-card-container">
      <Icon
        className="rc-workflow-card-icon"
        size="medium"
        type={
          node.type && node.type.toLowerCase() === 'trigger'
            ? 'activity'
            : 'build'
        }
      />
      <Text className="rc-workflow-label">{node.type || 'Action'}</Text>
      <Heading as="h4" className="rc-workflow-title">
        {node.id}
      </Heading>
      {children && <Card.Section>{children}</Card.Section>}
    </div>
  </Card>
);

WorkflowCard.propTypes = propTypes;
WorkflowCard.defaultProps = defaultProps;

export default WorkflowCard;
