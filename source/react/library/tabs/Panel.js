import React from 'react';
import PropTypes from 'prop-types';

import getTabId from './getTabId';
import getPanelId from './getPanelId';

const propTypes = {
  /** Internally managed tab ID  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Internally managed tabs ID  */
  parentId: PropTypes.string,
  /** Internally managed active state  */
  active: PropTypes.bool,
  /** Internally managed Panel contents */
  children: PropTypes.node,
};

const defaultProps = {
  id: null,
  parentId: null,
  active: false,
  children: null,
};

const Panel = ({ id, parentId, active, children }) => (
  <div
    role="tabpanel"
    id={getPanelId(parentId, id)}
    aria-labelledby={getTabId(parentId, id)}
    className="rc-tabs-panel"
    hidden={!active}
  >
    {children}
  </div>
);

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
