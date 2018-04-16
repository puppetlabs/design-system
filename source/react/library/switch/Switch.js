import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Icon from '../icon/Icon';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.bool,
};

const defaultProps = {
  className: null,
  disabled: false,
  checked: false,
  label: true,
};

/**
 * `Switch` allows the user to enable or disable something.
 */

class Switch extends React.Component {
  renderLabel() {
    let jsx;

    if (this.props.label) {
      jsx = (
        <label className="rc-switch-label" htmlFor={ this.props.name } >
          <span className="rc-switch-label-on"><Icon width="12px" height="12px" type="checkmark" /></span>
          <span className="rc-switch-label-off"><Icon width="12px" height="12px" type="close" /></span>
        </label>
      );
    } else {
      jsx = <label className="rc-switch-label" htmlFor={ this.props.name } />;
    }

    return jsx;
  }

  render() {
    const propsClassName = this.props.className;
    const label = this.renderLabel();

    const className = classnames('rc-switch', {
      'rc-switch-checked': propsClassName === null,
      [propsClassName]: propsClassName !== null,
    });

    return (
      <div className={ className }>
        <input
          className="rc-switch-checkbox"
          disabled={ this.props.disabled }
          checked={ this.props.checked }
          type="checkbox"
          id={ this.props.name }
          onChange={ this.props.onChange }
        />
        { label }
      </div>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
