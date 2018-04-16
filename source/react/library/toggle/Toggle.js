import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Switch from '../switch/Switch';

const propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.string,
};

const defaultProps = {
  name: '',
  onChange: null,
  disabled: false,
  active: '',
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
    this.onLabelClick = this.onLabelClick.bind(this);
  }

  onChange() {
    const { left, right } = this.props;
    const active = this.state.active === left ? right : left;

    this.setState({ active }, () => {
      if (this.props.onChange) {
        this.props.onChange(active);
      }
    });
  }

  onLabelClick(active) {
    return () => {
      if (active !== this.state.active && !this.props.disabled) {
        this.setState({ active }, () => {
          if (this.props.onChange) {
            this.props.onChange(active);
          }
        });
      }
    };
  }

  renderLabel(label) {
    const active = this.state.active === label;
    const className = classnames('rc-toggle-label', {
      'rc-toggle-active': active,
    });

    return (
      <a
        role="button"
        tabIndex={ 0 }
        onClick={ this.onLabelClick(label) }
        className={ className }
      >
        { label }
      </a>
    );
  }

  render() {
    const { left, right, name, disabled } = this.props;
    const leftLabel = this.renderLabel(left);
    const rightLabel = this.renderLabel(right);
    const className = classnames('rc-toggle', {
      'rc-toggle-disabled': disabled,
    });

    // We have to make this unique.
    const switchName = name || left + right;

    return (
      <div className={ className }>
        { leftLabel }
        <Switch
          label={ false }
          disabled={ disabled }
          onChange={ this.onChange }
          className="rc-switch-toggle"
          checked={ this.state.active === right }
          name={ switchName }
        />
        { rightLabel }
      </div>
    );
  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
