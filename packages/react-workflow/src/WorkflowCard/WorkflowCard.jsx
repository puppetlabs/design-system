import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Heading, Icon, Text } from '@puppet/react-components';
import './WorkflowCard.scss';

const propTypes = {
  children: PropTypes.node,
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
    needs: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
    children: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
  }).isRequired,
};

const defaultProps = {
  children: null,
};

const WorkflowCard = ({ node, children }) => (
  <Card
    className={classNames('rc-workflow-card', {
      'rc-workflow-has-children': node.children && node.children.length,
      'rc-workflow-has-parents': node.needs && node.needs.length,
    })}
  >
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
