import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import ActionMenuList from '../../internal/action-menu-list';
import {
  renderableElement,
  anchorOrientation,
} from '../../helpers/customPropTypes';
import { AVAILABLE_ICONS } from '../icon/Icon';
import { getDropdownPosition } from '../../helpers/statics';

const propTypes = {
  /** Unique id */
  id: PropTypes.string.isRequired,
  /** An Array of action objects */
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
  /** Anchor orientation of the dropdown menu */
  anchor: anchorOrientation,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  actions: [],
  label: '',
  type: 'primary',
  weight: 'bold',
  anchor: 'bottom left',
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
      menuStyle: {},
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
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    const { anchor } = this.props;

    this.setState(
      { open: true, menuStyle: getDropdownPosition(this.button, anchor, 8) },
      this.focusMenu,
    );
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
    const { open, menuStyle } = this.state;
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
        ref={container => {
          this.container = container;
        }}
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
        <ActionMenuList
          id={`${id}-menu`}
          actions={actions}
          aria-labelledby={id}
          onActionClick={this.closeAndFocusButton}
          onBlur={this.onMenuBlur}
          onEscape={this.closeAndFocusButton}
          style={menuStyle}
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
