import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Internally managed tab ID  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Internally managed tabs ID  */
  tabsId: PropTypes.string,
  /** Internally managed active state  */
  active: PropTypes.bool,
  /** Internally managed Panel contents */
  children: PropTypes.node,
};

const defaultProps = {
  id: null,
  tabsId: null,
  active: false,
  children: null,
};

const Panel = ({ id, tabsId, active, children }) => {
  const panelProps = {
    role: 'tabpanel',
    id: `${tabsId}-panel-${id}`,
    'aria-labelledby': `${tabsId}-tab-${id}`,
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
