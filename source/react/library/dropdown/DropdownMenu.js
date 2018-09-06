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
  target: PropTypes.shape({}),
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
  options: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.node,
  /** Whether or not the user can select multiple menu options */
  multiple: PropTypes.bool,
  margin: PropTypes.number,
  /** Allows the Dropdown to be rendered inline rather than within a Portal */
  disablePortal: PropTypes.bool,
  /** Callback that is fired whenever one of the provided actions is clicked */
  onActionClick: PropTypes.func,
  /** Maintains width between the button and the dropdown menu */
  synchronizeWidth: PropTypes.bool,
};

const defaultProps = {
  anchor: 'bottom left',
  actions: null,
  target: null,
  selected: [],
  options: [],
  size: 'small',
  width: 'auto',
  blank: '',
  multiple: false,
  hint: '',
  margin: null,
  disablePortal: false,
  synchronizeWidth: false,
  onOpen: null,
  onClose: null,
  onApply: null,
  onChange: null,
  onActionClick: null,
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
    const { onOpen } = this.props;
    if (onOpen) {
      onOpen();
    }
  }

  onClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  onClosePopover() {
    this.popover.close();
  }

  onChange(option) {
    const { onChange, multiple } = this.props;
    if (onChange) {
      onChange(option);
    }

    if (this.popover && !multiple) {
      this.popover.close();
    }
  }

  onApply() {
    const { onApply } = this.props;
    if (onApply) {
      onApply();
      this.popover.close();
    }
  }

  onActionClick(option) {
    const { onActionClick } = this.props;
    if (onActionClick) {
      onActionClick(option);
    }

    this.popover.close();
  }

  renderMenu() {
    const { size, options, actions, selected, multiple, blank } = this.props;
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
            multiple={multiple}
            onChange={this.onChange}
          />
          {actions}
        </Menu>
      );
    } else if (blank) {
      jsx = <p className="rc-dropdown-blank">{blank}</p>;
    }

    if (blank || multiple) {
      jsx = <Menu.Section className="rc-menu-section-list">{jsx}</Menu.Section>;
    }

    return jsx;
  }

  renderApplyButton() {
    const { multiple } = this.props;
    let jsx;

    if (multiple) {
      jsx = (
        <Menu.Section>
          <Button block size="small" label="Apply" onClick={this.onApply} />
        </Menu.Section>
      );
    }

    return jsx;
  }

  render() {
    const {
      size,
      multiple,
      hint,
      anchor,
      target,
      margin,
      disablePortal,
      synchronizeWidth,
      width: widthProp,
    } = this.props;
    const menu = this.renderMenu();
    const applyButton = this.renderApplyButton();
    const className = classnames('rc-dropdown-menu', {
      [`rc-dropdown-menu-${size}`]: size,
      'rc-dropdown-menu-multiple': multiple,
      'rc-dropdown-menu-with-header': hint,
    });

    let width;

    if (!synchronizeWidth) {
      width = widthProp;
    }

    return (
      <Popover
        menu
        hint={hint}
        closeButton={!!hint}
        anchor={anchor}
        ref={c => {
          this.popover = c;
        }}
        width={width}
        inheritTargetWidth={synchronizeWidth}
        className={className}
        target={target}
        onOpen={this.onOpen}
        onClose={this.onClose}
        margin={margin}
        size={size}
        disablePortal={disablePortal}
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
