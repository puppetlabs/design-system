import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  /** Text to render in place of a current label */
  placeholder: PropTypes.string,
  /** Human readable identifier for the current selected option */
  label: PropTypes.string,
  /* Inherit button styles - default is transparent */
  transparent: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  /* Disabled state */
  disabled: PropTypes.bool,
  /* Error state */
  error: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  /* Sets the size of the anchor/button */
  size: PropTypes.oneOf(['tiny', 'small', 'large', 'auto', null]),
};

const defaultProps = {
  placeholder: '',
  label: '',
  primary: false,
  secondary: false,
  transparent: true,
  disabled: false,
  error: '',
  tabIndex: 0,
  onClick: () => {},
  size: null,
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
      error,
      tabIndex,
      disabled,
      onClick,
      size,
    } = this.props;
    let label = propsLabel;

    if (placeholder && !label) {
      label = placeholder;
    } else if (!label) {
      label = 'Select One';
    }

    const className = classnames('rc-button', {
      'rc-button-transparent': transparent && !primary && !secondary,
      'rc-button-secondary': secondary,
      'rc-button-primary': primary,
      'rc-button-error': error,
      [`rc-button-${size}`]: size,
    });

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <a
        role="button"
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        <span className="rc-dropdown-label">
          <span className="rc-button-content">{label}</span>{' '}
          <Icon width="8px" height="8px" type="chevron-down" />
        </span>
      </a>
    );
  }
}

DropdownLabel.propTypes = propTypes;
DropdownLabel.defaultProps = defaultProps;

export default DropdownLabel;
