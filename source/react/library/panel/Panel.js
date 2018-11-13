import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { ENTER_KEY_CODE } from '../../constants';
import deprecate from '../../helpers/deprecate';

const propTypes = {
  secondary: PropTypes.bool,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  /** Callback for detecting user remove action */
  onRemove: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(['flat', 'raised', 'active', null]),
};

const defaultProps = {
  secondary: false,
  clickable: false,
  className: '',
  onClick: () => {},
  onRemove: null,
  children: null,
  type: null,
};

/**
 * `Panel` groups components together.
 */
class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onRemove(e) {
    const { onRemove } = this.props;
    e.preventDefault();

    if (onRemove) {
      onRemove(e);
    }
  }

  onKeyDown(e) {
    const { onRemove } = this.props;

    if (e.keyCode === ENTER_KEY_CODE) {
      onRemove(e);
    }
  }

  renderRemoveButton() {
    const { onRemove } = this.props;
    let jsx;

    if (onRemove) {
      jsx = (
        <div
          role="button"
          tabIndex={0}
          className="remove-corner rc-panel-remove"
          onClick={this.onRemove}
          onKeyDown={this.onKeyDown}
        >
          <Icon size="small" type="close" />
        </div>
      );
    }

    return jsx;
  }

  render() {
    const {
      children,
      secondary,
      type,
      onRemove,
      className,
      clickable,
      onClick,
    } = this.props;
    const extraProps = {};
    const classNames = classnames('rc-panel', className, {
      'rc-panel-clickable': clickable,
      'rc-panel-secondary': secondary,
      'rc-panel-removable': onRemove,
      [`rc-panel-${type}`]: type,
    });

    const removeButton = this.renderRemoveButton();

    if (clickable) {
      extraProps.onClick = onClick;
      extraProps.role = 'button';
    }

    return (
      <div className={classNames} {...extraProps}>
        {removeButton}
        {children}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default deprecate({
  removalVersion: '5.0.0',
  upgradeInstructions: 'Please replace all uses with the <Card /> component',
})(Panel);
