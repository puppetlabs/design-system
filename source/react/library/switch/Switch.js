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
    const { label, name } = this.props;
    let jsx;

    /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
    if (label) {
      jsx = (
        <label className="rc-switch-label" htmlFor={name}>
          <span className="rc-switch-label-on">
            <Icon width="12px" height="12px" type="checkmark" />
          </span>
          <span className="rc-switch-label-off">
            <Icon width="12px" height="12px" type="close" />
          </span>
        </label>
      );
    } else {
      jsx = <label className="rc-switch-label" htmlFor={name} />;
    }
    /* eslint-enable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

    return jsx;
  }

  render() {
    const { className, disabled, checked, name, onChange } = this.props;
    const label = this.renderLabel();

    const classNames = classnames('rc-switch', className, {
      'rc-switch-checked': className === null,
    });

    return (
      <div className={classNames}>
        <input
          className="rc-switch-checkbox"
          disabled={disabled}
          checked={checked}
          type="checkbox"
          id={name}
          onChange={onChange}
        />
        {label}
      </div>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
