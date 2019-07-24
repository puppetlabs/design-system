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
const CardButton = ({ className, ...rest }) => (
  <div className={classNames('rc-card-action-select', className)}>
    <Button icon="trash" type="transparent" {...rest} />
  </div>
);

CardButton.propTypes = propTypes;
CardButton.defaultProps = defaultProps;

export default CardButton;
