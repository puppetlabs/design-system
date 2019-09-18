import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Text from '../text';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const AlertMessage = ({ className, ...rest }) => (
  <Text
    className={classNames('rc-alert-body-message', className)}
    size="small"
    {...rest}
  />
);

AlertMessage.propTypes = propTypes;
AlertMessage.defaultProps = defaultProps;

export default AlertMessage;
