import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.string,
};

const LoadingIndicator = (props) => {
  const className = classnames('rc-loading', props.className);
  let size;

  switch (props.size) {
    case 'small':
      size = '50px';
      break;
    default:
      size = '100px';
  }

  return (
    <div className={ className }>
      <Icon type="loader" height={ size } width={ size } />
    </div>
  );
};

LoadingIndicator.propTypes = propTypes;

export default LoadingIndicator;
