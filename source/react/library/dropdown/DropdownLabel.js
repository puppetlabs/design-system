import PropTypes from 'prop-types';
import React from 'react';
import Button from '../buttons/Button';

const propTypes = {
  /** Text to render in place of a current label */
  placeholder: PropTypes.string,
  /** Human readable identifier for the current selected option */
  label: PropTypes.string,
  /* Inherit button styles - default is transparent */
  transparent: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  simple: PropTypes.bool,
  /* Disabled state */
  disabled: PropTypes.bool,
  /* Error state */
  error: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  placeholder: '',
  label: '',
  primary: false,
  secondary: false,
  transparent: true,
  simple: false,
  disabled: false,
  error: '',
  onClick: () => {},
};

/**
 * `DropdownLabel` allows users to open `Dropdown`s, and displays either a prompt or the currently
 * selected `Dropdown` item.
 */

// eslint-disable-next-line react/prefer-stateless-function
class DropdownLabel extends React.Component {
  render() {
    const {
      label: propsLabel,
      placeholder,
      primary,
      secondary,
      transparent,
      simple,
      error,
      disabled,
      onClick,
    } = this.props;
    let label = propsLabel;

    if (placeholder && !label) {
      label = placeholder;
    } else if (!label) {
      label = 'Select One';
    }

    /**
     * BAD CODE ALERT
     * This is a temporary hack to map the current DropdownLabel props to
     * the new Button props. We will remove this at a later date
     * when the dropdown component is hardened
     */
    let type;

    if (error) {
      type = 'danger';
    } else if (simple) {
      type = 'text';
    } else if (secondary) {
      type = 'tertiary';
    } else if (primary) {
      type = 'primary';
    } else if (transparent) {
      type = 'transparent';
    }

    return (
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        trailingIcon="chevron-down"
      >
        {label}
      </Button>
    );
  }
}

DropdownLabel.propTypes = propTypes;
DropdownLabel.defaultProps = defaultProps;

export default DropdownLabel;
