import React from 'react';
import classnames from 'classnames';

const propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.any,
};

const defaultProps = {
  active: false,
  children: null,
};

/**
 * `TabPanel` groups components together within `Tabs`.
 */
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
TabPanel.defaultProps = defaultProps;

module.exports = TabPanel;
