import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';
import Text from '../text';
import Icon from '../icon';
import IconButton from './IconButton';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  /** Main content */
  children: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf(['neutral', 'info', 'danger', 'success', 'warning']),
  /** Should the alert have a dismiss button? */
  closeable: PropTypes.bool,
  /** What should happen on explicit close? */
  onClose: PropTypes.func,
  /** Should the alert render at the top of page? */
  growl: PropTypes.bool,
  /** Should the dismiss timer start? */
  isActive: PropTypes.bool,
  /** How long should the growl stay on the page? */
  dismissAfter: PropTypes.number,
  /** Alert 'elevation' visually indicated with box-shadow */
  elevated: PropTypes.bool,
  /** Optional additional className. */
  className: PropTypes.string,
  /** Optional additional inline styles. */
  styles: PropTypes.shape({}),
};

const defaultProps = {
  children: '',
  type: 'info',
  closeable: false,
  onClose() {},
  growl: false,
  isActive: true,
  dismissAfter: 5000,
  elevated: false,
  className: '',
  styles: {},
};

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    const { isActive } = this.props;

    if (isActive) {
      this.handleDismiss(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isActive } = this.props;

    if (!isActive && nextProps.isActive) {
      this.handleDismiss(nextProps);
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

  handleDismiss(props) {
    const { dismissAfter } = props;

    if (dismissAfter) {
      setTimeout(() => {
        this.onClose();
      }, dismissAfter);
    }
  }

  render() {
    const {
      children,
      type,
      closeable,
      growl,
      isActive,
      dismissAfter,
      elevated,
      className,
      ...rest
    } = this.props;
    const classNames = classnames(
      'rc-alert',
      {
        [`rc-alert-${type}`]: type,
        'rc-alert-static': !growl,
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
      case 'info':
      case 'neutral':
      case 'warning':
        typeIcon = 'question-circle';
        break;
      default:
        typeIcon = 'check-circle';
    }

    if (!isActive) {
      return false;
    }

    if (closeable) {
      closeButton = (
        <IconButton
          icon="x"
          type={type}
          onClick={this.onClose}
          onKeyDown={this.onKeyDown}
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
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
