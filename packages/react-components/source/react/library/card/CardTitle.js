import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../heading';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardTitle = ({ className, ...rest }) => (
  <Heading
    as="h4"
    className={classNames('rc-card-title', className)}
    {...rest}
  />
);

CardTitle.propTypes = propTypes;
CardTitle.defaultProps = defaultProps;

export default CardTitle;
