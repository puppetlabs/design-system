import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node,
  /** Managed internally for events */
  id: PropTypes.number.isRequired,
};

const defaultProps = {
  title: '',
  children: null,
};

const Panel = ({ title, selected, children, id }) => {
  const panelProps = {
    role: 'tabpanel',
    id: `${id}-panel`,
    'aria-labelledby': title,
    hidden: !selected,
  };

  return (
    <div className="rc-tabs-panel" {...panelProps}>
      {children}
    </div>
  );
};

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
