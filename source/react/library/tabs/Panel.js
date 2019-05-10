import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  /** Is the panel active?  */
  active: PropTypes.bool,
  /** Panel contents */
  children: PropTypes.node,
  /** Managed internally for events */
  id: PropTypes.number,
};

const defaultProps = {
  title: '',
  active: false,
  children: null,
  id: null,
};

const Panel = ({ title, active, children, id }) => {
  const panelProps = {
    role: 'tabpanel',
    id: `${id}-panel`,
    'aria-labelledby': title,
    hidden: !active,
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
