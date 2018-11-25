import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Switch from '../switch/Switch';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  left: PropTypes.string,
  right: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  left: '',
  name: '',
  onChange: null,
  disabled: false,
  active: '',
  className: '',
};

/**
 * `Toggle` allows the user to toggle between two options.
 */

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    const active = props.active || props.left;

    this.state = { active };

    this.onChange = this.onChange.bind(this);
    this.onClickLabel = this.onClickLabel.bind(this);
    this.onKeyDownLabel = this.onKeyDownLabel.bind(this);
  }

  onChange() {
    const { left, right, onChange } = this.props;
    const { active: activeState } = this.state;
    const active = activeState === left ? right : left;

    this.setState({ active }, () => {
      if (onChange) {
        onChange(active);
      }
    });
  }

  onKeyDownLabel(active) {
    return e => {
      if (e.keyCode === ENTER_KEY_CODE) {
        this.onClickLabel(active);
      }
    };
  }

  onClickLabel(active) {
    const { disabled, onChange } = this.props;
    const { active: activeState } = this.state;
    return () => {
      if (active !== activeState && !disabled) {
        this.setState({ active }, () => {
          if (onChange) {
            onChange(active);
          }
        });
      }
    };
  }

  renderLabel(label) {
    const { active: activeState } = this.state;
    const active = activeState === label;
    const className = classnames('rc-toggle-label', {
      'rc-toggle-active': active,
    });

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        role="button"
        tabIndex={0}
        onClick={this.onClickLabel(label)}
        onKeyDown={this.onKeyDownLabel(label)}
        className={className}
      >
        {label}
      </a>
    );
  }

  render() {
    const { left, right, name, disabled, className } = this.props;
    const { active } = this.state;
    const classNames = classnames(
      'rc-toggle',
      {
        'rc-toggle-disabled': disabled,
      },
      className,
    );

    // We have to make this unique.
    const switchName = name || left + right;

    return (
      <div className={classNames}>
        {left && this.renderLabel(left)}
        <Switch
          label={false}
          disabled={disabled}
          onChange={this.onChange}
          className="rc-switch-toggle"
          checked={active === right}
          name={switchName}
        />
        {right && this.renderLabel(right)}
      </div>
    );
  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
