import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  className: '',
  children: null,
};

/**
 * The card header is a flex container that allows for non-overlapping title and
 * actions.
 */
const CardHeader = ({ className, children, ...rest }) => (
  <div className={classNames('rc-card-header', className)} {...rest}>
    {children}
  </div>
);

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
