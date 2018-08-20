import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Popover from '../popover/Popover';
import Button from '../buttons/Button';
import Menu from '../menu/Menu';

const propTypes = {
  anchor: PropTypes.string,
  onChange: PropTypes.func,
  onApply: PropTypes.func,
  target: PropTypes.object,
  width: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  size: PropTypes.string,
  /** Signify which options are currently selected */
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
  blank: PropTypes.string,
  /** A prompt for the user once the DropdownMenu has been opened */
  hint: PropTypes.string,
  options: PropTypes.array,
  actions: PropTypes.any,
  /** Whether or not the user can select multiple menu options */
  multiple: PropTypes.bool,
  margin: PropTypes.number,
  /** Allows the Dropdown to be rendered inline rather than within a Portal */
  disablePortal: PropTypes.bool,
  /** Callback that is fired whenever one of the provided actions is clicked */
  onActionClick: PropTypes.func,
};

const defaultProps = {
  target: null,
  selected: [],
  options: [],
  size: 'small',
  width: 'auto',
  blank: '',
  multiple: false,
  margin: null,
  disablePortal: false,
  onOpen: null,
  onClose: null,
  onApply: null,
  onChange: null,
};

/**
 * `DropdownMenu` renders a Dropdown containing a Menu and a list of options.
 */

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClosePopover = this.onClosePopover.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onClosePopover() {
    this.popover.close();
  }

  onChange(option) {
    if (this.props.onChange) {
      this.props.onChange(option);
    }

    if (this.popover && !this.props.multiple) {
      this.popover.close();
    }
  }

  onApply() {
    if (this.props.onApply) {
      this.props.onApply();
      this.popover.close();
    }
  }

  onActionClick(option) {
    if (this.props.onActionClick) {
      this.props.onActionClick(option);
    }

    this.popover.close();
  }

  renderMenu() {
    const { size, options, actions, selected } = this.props;
    let jsx;

    if (options.length > 0) {
      let className;

      if (actions) {
        className = 'rc-menu-first';
      }

      jsx = (
        <Menu size={size} className={className}>
          <Menu.List
            options={options}
            selected={selected}
            multiple={this.props.multiple}
            onChange={this.onChange}
          />
          {actions}
        </Menu>
      );
    } else if (this.props.blank) {
      jsx = <p className="rc-dropdown-blank">{this.props.blank}</p>;
    }

    if (this.props.blank || this.props.multiple) {
      jsx = <Menu.Section className="rc-menu-section-list">{jsx}</Menu.Section>;
    }

    return jsx;
  }

  renderApplyButton() {
    let jsx;

    if (this.props.multiple) {
      jsx = (
        <Menu.Section>
          <Button block size="small" label="Apply" onClick={this.onApply} />
        </Menu.Section>
      );
    }

    return jsx;
  }

  render() {
    const menu = this.renderMenu();
    const applyButton = this.renderApplyButton();
    const className = classnames('rc-dropdown-menu', {
      [`rc-dropdown-menu-${this.props.size}`]: this.props.size,
      'rc-dropdown-menu-multiple': this.props.multiple,
      'rc-dropdown-menu-with-header': this.props.hint,
    });

    return (
      <Popover
        menu
        hint={this.props.hint}
        closeButton={!!this.props.hint}
        anchor={this.props.anchor}
        ref={c => {
          this.popover = c;
        }}
        className={className}
        target={this.props.target}
        onOpen={this.onOpen}
        onClose={this.onClose}
        margin={this.props.margin}
        size={this.props.size}
        width={this.props.width}
        disablePortal={this.props.disablePortal}
      >
        {menu}
        {applyButton}
      </Popover>
    );
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
