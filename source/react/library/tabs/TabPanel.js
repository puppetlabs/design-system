import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  active: React.PropTypes.bool,
};

const TabPanel = (props) => {
  const className = classnames('rc-tab-panel', {
    'rc-tab-panel-active': props.active,
  });

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

TabPanel.propTypes = propTypes;

module.exports = TabPanel;
