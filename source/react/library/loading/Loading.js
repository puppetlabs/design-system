import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const viewBox = '4 4 32 32';
const svg = (
  <g>
    <path
      opacity="0.2"
      d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
    />
    <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
  </g>
);

const propTypes = {
  /** Optional choose your size */
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  /** Optional add additional classes */
  className: PropTypes.string,
  /** Optional add additional inline styles */
  style: PropTypes.shape({}),
};

const defaultProps = {
  size: 'large',
  className: '',
  style: {},
};

/**
 * `Loading` does what you would think, it indicates a loading state.
 */

const Loading = ({ className, size: propSize, style }) => {
  let size;

  switch (propSize) {
    case 'tiny':
      size = '40px';
      break;
    case 'small':
      size = '50px';
      break;
    case 'large':
    default:
      size = '100px';
      break;
  }

  return (
    <div className={classnames('rc-loading', className)}>
      <Icon
        svg={svg}
        viewBox={viewBox}
        style={{
          width: size,
          height: size,
          ...style,
        }}
      />
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
