import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionSelect from '../action-select';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const CardActionSelect = ({ className, ...rest }) => (
  <div className={classNames('rc-card-actions', className)}>
    <ActionSelect
      icon="kebab"
      type="transparent"
      anchor="bottom right"
      {...rest}
    />
  </div>
);

CardActionSelect.propTypes = propTypes;
CardActionSelect.defaultProps = defaultProps;

export default CardActionSelect;
