import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Text from '../text';
import Icon from '../icon';
import IconButton from './IconButton';

const propTypes = {
  /** Main content */
  children: PropTypes.string,
  /** Additional content */
  bodyText: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf(['info', 'danger', 'success', 'warning']),
  /** Should the alert have a dismiss button? */
  closeable: PropTypes.bool,
  /** What should happen on explicit close? */
  onClose: PropTypes.func,
  /** Alert 'elevation' visually indicated with box-shadow */
  elevated: PropTypes.bool,
  /** Optional additional className. */
  className: PropTypes.string,
  /** Optional additional inline styles. */
  styles: PropTypes.shape({}),
};

const defaultProps = {
  children: '',
  bodyText: '',
  type: 'info',
  closeable: false,
  onClose() {},
  elevated: false,
  className: '',
  styles: {},
};

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const {
      children,
      bodyText,
      type,
      closeable,
      elevated,
      className,
      ...rest
    } = this.props;
    const classNames = classnames(
      'rc-alert',
      {
        [`rc-alert-${type}`]: type,
        'rc-alert-elevated': elevated,
      },
      className,
    );
    let closeButton;
    let typeIcon;

    switch (type) {
      case 'danger':
        typeIcon = 'alert';
        break;
      case 'success':
        typeIcon = 'check-circle';
        break;
      case 'info':
      case 'warning':
        typeIcon = 'alert';
        break;
      default:
        typeIcon = 'info-circle';
    }

    if (closeable) {
      closeButton = (
        <IconButton
          icon="x"
          type={type}
          onClick={this.onClose}
          className="rc-alert-dismiss-icon"
        />
      );
    }

    return (
      <div className={classNames} {...rest}>
        <Icon className="rc-alert-primary-icon" type={typeIcon} size="medium" />
        <Text className="rc-alert-message" size="small">
          {children}
        </Text>
        {closeButton}
        {bodyText && (
          <Text className="rc-alert-body-message" size="small">
            {bodyText}
          </Text>
        )}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
