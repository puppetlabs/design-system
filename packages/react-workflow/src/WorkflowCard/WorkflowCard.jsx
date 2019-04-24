import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from '@puppet/react-components';
import './WorkflowCard.scss';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  actions: [],
  children: null,
  icon: '',
  subtitle: '',
  title: '',
};

const PipelineCard = ({ actions, children, icon, subtitle, title }) => (
  <Card className="rc-workflow-card">
    {title && (
      <Card.Header
        title={
          <>
            {icon && <Icon type={icon} />}
            {title}
          </>
        }
        subtitle={subtitle}
        actions={actions}
      />
    )}
    <Card.Section>{children}</Card.Section>
  </Card>
);

PipelineCard.propTypes = propTypes;
PipelineCard.defaultProps = defaultProps;

export default PipelineCard;
