import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import ActionMenuInternal from '../../internal/action-menu';
import { renderableElement } from '../../helpers/customPropTypes';
import { AVAILABLE_ICONS } from '../icon/Icon';

const propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      icon: PropTypes.oneOf(AVAILABLE_ICONS),
      onClick: PropTypes.func,
      as: renderableElement,
    }),
  ),
  label: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  actions: [],
  label: '',
  type: 'primary',
  weight: 'bold',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  style: {},
};

class ActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.focusButton = this.focusButton.bind(this);
    this.focusMenu = this.focusMenu.bind(this);
    this.closeAndFocusButton = this.closeAndFocusButton.bind(this);
    this.onMenuBlur = this.onMenuBlur.bind(this);
  }

  onClickButton() {
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onMenuBlur(e) {
    if (e.relatedTarget !== this.button) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    this.setState({ open: true }, this.focusMenu);
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    if (this.menu) {
      this.menu.focus();
    }
  }

  focusButton() {
    if (this.button) {
      this.button.focus();
    }
  }

  render() {
    const { open } = this.state;
    const {
      id,
      label,
      type,
      icon,
      disabled,
      loading,
      actions,
      weight,
      className,
      style,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-action-menu',
          {
            'rc-action-menu-open': open,
            'rc-action-menu-closed': !open,
          },
          className,
        )}
        style={style}
      >
        <Button
          type={type}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {label}
        </Button>
        <ActionMenuInternal
          id={`${id}-menu`}
          actions={actions}
          aria-labelledby={id}
          onActionClick={this.closeAndFocusButton}
          onBlur={this.onMenuBlur}
          onEscape={this.closeAndFocusButton}
          ref={menu => {
            this.menu = menu;
          }}
        />
      </div>
    );
  }
}

ActionMenu.propTypes = propTypes;
ActionMenu.defaultProps = defaultProps;

export default ActionMenu;
