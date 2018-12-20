import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Icon from '../icon/Icon';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

const defaultProps = {
  name: '',
  checked: false,
  disabled: false,
  onChange: () => {},
  required: false,
};

/**
 * `Checkbox` is a controlled component that allows users to check and uncheck items.
 */

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checked: props.checked };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { checked } = this.state;

    if (checked !== newProps.checked) {
      this.setState({ checked: newProps.checked });
    }
  }

  onChange() {
    const { onChange } = this.props;

    this.setState(
      state => ({ ...state, checked: !state.checked }),
      () => {
        const { checked } = this.state;
        onChange(checked);
      },
    );
  }

  render() {
    const { checked } = this.state;
    const { disabled, name, required } = this.props;

    const className = classnames('rc-checkbox', {
      'rc-checkbox-checked': checked,
      'rc-checkbox-disabled': disabled,
    });
    /* eslint-disable jsx-a11y/role-supports-aria-props */

    return (
      <div className="rc-checkbox-container">
        <input
          type="checkbox"
          onChange={this.onChange}
          disabled={disabled}
          checked={checked}
          className={className}
          aria-required={required}
          value={name}
          id={name}
        />
        <Icon onClick={this.onChange} type="check" width="16px" height="16px" />
      </div>
    );
    /* eslint-enable */
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
