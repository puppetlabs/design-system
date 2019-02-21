import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  className: PropTypes.string,
  /** Currently only `small` is supported */
  size: PropTypes.string,
};

const defaultProps = {
  className: '',
  size: '',
};

/**
 * `Loading` does what you would think, it indicates a loading state.
 */

const Loading = ({ className, size: propSize }) => {
  let size;

  switch (propSize) {
    case 'tiny':
      size = '40px';
      break;
    case 'small':
      size = '50px';
      break;
    default:
      size = '100px';
  }

  return (
    <div className={classnames('rc-loading', className)}>
      <Icon type="loader" style={{ height: size, width: size }} />
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
