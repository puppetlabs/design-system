import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Button from '../buttons/Button';
import Text from '../text';
import Icon from '../icon';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  message: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  closeable: PropTypes.bool,
  growl: PropTypes.bool,
  onClose: PropTypes.func,
  dismissAfter: PropTypes.number,
};

const defaultProps = {
  isActive: false,
  closeable: true,
  type: 'success',
  growl: true,
  onClose: () => {},
  dismissAfter: 5000,
};

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    const { dismissAfter } = this.props;

    if (dismissAfter) {
      setTimeout(() => {
        this.onClose();
      }, dismissAfter);
    }
  }

  onClose() {
    const { onClose } = this.props;

    onClose();
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClose();
    }
  }

  render() {
    const { message, isActive, type, closeable, growl } = this.props;
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
      // TODO: we need to find a way to use the button component with simple icons that don't
      // need the various button styles
      closeButton = (
        <div
          className="rc-alert-close"
          role="button"
          tabIndex={0}
          onClick={this.onClose}
          onKeyDown={this.onKeyDown}
        >
          <Icon type="close" size="tiny" />
        </div>
      );
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
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
