import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card button is just a Button with some defaults set
 */
const CardAction = ({ className, ...rest }) => (
  <div className={classNames('rc-card-actions', className)}>
    <Button icon="pencil" type="transparent" {...rest} />
  </div>
);

CardAction.propTypes = propTypes;
CardAction.defaultProps = defaultProps;

export default CardAction;
