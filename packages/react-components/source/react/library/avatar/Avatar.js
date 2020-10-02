import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  /** The content to render within the badge */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional avatar size */
  size: PropTypes.shape({}),
   /** Optional additional inline styles */
   style: PropTypes.shape({}),
};

const defaultProps = {
  children: null,
  className: '',
  size: {},
  style: {},
};

const Avatar = ({ children, className, size, style, ...props }) => (
  <div className={classNames('rc-avatar', className)} {...props} style={{...size, ...style}}>
    {children}
  </div>
);

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
