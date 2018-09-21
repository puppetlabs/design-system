import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from '../buttons/Button';
import Text from '../text';
import Icon from '../icon';

const propTypes = {
  message: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  closeable: PropTypes.bool,
  growl: PropTypes.bool,
  onClose: PropTypes.func,
};

const defaultProps = {
  isActive: false,
  closeable: true,
  type: 'success',
  growl: true,
  onClose: () => {},
};

const Alert = props => {
  const { message, isActive, type, closeable, onClose, growl } = props;
  const classNames = classnames('rc-alert', {
    [`rc-alert-${type}`]: type,
    'rc-alert-static': !growl,
  });
  let closeButton;
  let typeIcon;

  switch (type) {
    case 'error':
      typeIcon = 'close-circle';
      break;
    case 'info':
    case 'warning':
      typeIcon = 'info-circle';
      break;
    default:
      typeIcon = 'check-circle';
  }

  if (!isActive) {
    return false;
  }

  if (closeable) {
    closeButton = <Icon className="rc-alert-close" type="close" size="tiny" />;
  }

  return (
    <div className={classNames}>
      <Icon className="rc-alert-type-icon" type={typeIcon} size="medium" />
      <Text className="rc-alert-message" size="small">
        {message}
      </Text>
      {closeButton}
    </div>
  );
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
