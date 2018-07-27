import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  secondary: PropTypes.bool,
  className: PropTypes.string,
  /** Callback for detecting user remove action */
  onRemove: PropTypes.func,
  children: PropTypes.any,
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
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  renderRemoveButton() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <div
          role="button"
          tabIndex={ 0 }
          className="remove-corner"
          onClick={ this.onRemove }
        >
          <a href="" className="rc-panel-remove"><Icon width="11px" height="11px" type="close" /></a>
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
      <div className={ classNames }>
        { removeButton }
        { children }
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
