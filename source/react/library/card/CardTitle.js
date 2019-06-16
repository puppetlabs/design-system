import React from 'react';
import classNames from 'classnames';
import Heading from '../heading';

const propTypes = {};

const defaultProps = {};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardTitle = ({ className, ...rest }) => (
  <Heading
    as="h3"
    className={classNames('rc-card-title', className)}
    {...rest}
  />
);

CardTitle.propTypes = propTypes;
CardTitle.defaultProps = defaultProps;

export default CardTitle;
