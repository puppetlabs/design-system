import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  secondary: PropTypes.bool,
  className: PropTypes.string,
  /** Callback for detecting user remove action */
  onRemove: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  secondary: false,
  className: '',
  onRemove: null,
  children: null,
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
    const { children, secondary, onRemove, className } = this.props;
    const classNames = classnames('rc-panel', className, {
      'rc-panel-secondary': secondary,
      'rc-panel-removable': onRemove,
    });

    const removeButton = this.renderRemoveButton();

    return (
      <div className={classNames}>
        {removeButton}
        {children}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
