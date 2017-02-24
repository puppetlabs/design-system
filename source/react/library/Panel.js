import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  secondary: React.PropTypes.bool,
  className: React.PropTypes.string,
};

const defaultProps = {
  secondary: false,
};

const Panel = (props) => {
  const className = classnames('rc-panel', {
    'rc-panel-secondary': props.secondary,
  }, props.className);

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
