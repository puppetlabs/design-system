import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import ActionMenuList from '../../internal/action-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import { getDropdownPosition, focus } from '../../helpers/statics';
import withId from '../../helpers/withId';

const propTypes = {
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: PropTypes.string.isRequired,
  /** An Array of action objects */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique action id */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** Action text */
      label: PropTypes.node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: PropTypes.element,
      /** Action click handler. Not needed if the action is a link */
      onClick: PropTypes.func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: PropTypes.elementType,
      /** Make a row unclickable */
      disabled: PropTypes.bool,
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
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus: PropTypes.bool,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Anchor orientation of the dropdown menu */
  anchor: anchorOrientation,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline width passed to the button element */
  width: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  actions: [],
  label: '',
  type: 'primary',
  innerFocus: false,
  weight: 'bold',
  anchor: 'bottom left',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  width: null,
  style: {},
};

class ActionSelect extends Component {
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
    this.onBlur = this.onBlur.bind(this);
  }

  onClickButton(e) {
    e.stopPropagation();
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onBlur(e) {
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
    focus(this.menu);
  }

  focusButton() {
    if (this.button) {
      focus(this.button);
    }
  }

  render() {
    const { open, menuStyle } = this.state;
    const {
      id,
      label,
      type,
      innerFocus,
      icon,
      disabled,
      loading,
      actions,
      weight,
      className,
      width,
      style,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-action-select',
          {
            'rc-action-select-open': open,
            'rc-action-select-closed': !open,
          },
          className,
        )}
        style={style}
        onBlur={this.onBlur}
        ref={(container) => {
          this.container = container;
        }}
      >
        <Button
          type={type}
          innerFocus={innerFocus}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          style={width ? { width, textAlign: 'left' } : null}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={(button) => {
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
          onEscape={this.closeAndFocusButton}
          style={menuStyle}
          ref={(menu) => {
            this.menu = menu;
          }}
        />
      </div>
    );
  }
}

ActionSelect.propTypes = propTypes;
ActionSelect.defaultProps = defaultProps;

export default withId(ActionSelect);
