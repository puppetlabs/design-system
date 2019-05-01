import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Popover from '../popover/Popover';
import Button from '../buttons/Button';
import Menu from '../../internal/deprecated-menu/Menu';

const propTypes = {
  anchor: PropTypes.string,
  onChange: PropTypes.func,
  onApply: PropTypes.func,
  target: PropTypes.shape({}),
  width: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  /** Signify which options are currently selected */
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
  blank: PropTypes.string,
  /** A prompt for the user once the DropdownMenu has been opened */
  title: PropTypes.string,
  applyLabel: PropTypes.string,
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
  inheritWidth: PropTypes.bool,
};

const defaultProps = {
  anchor: 'bottom left',
  actions: null,
  target: null,
  selected: [],
  options: [],
  width: 'auto',
  blank: '',
  multiple: false,
  title: '',
  applyLabel: 'Apply',
  margin: null,
  disablePortal: false,
  inheritWidth: false,
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
    const { options, actions, selected, multiple, blank } = this.props;
    let jsx;

    if (options.length > 0) {
      jsx = (
        <div>
          <Menu.List
            options={options}
            selected={selected}
            multiple={multiple}
            onChange={this.onChange}
          />
          {actions}
        </div>
      );
    } else if (blank) {
      jsx = <p className="rc-dropdown-blank">{blank}</p>;
    }

    if (blank || multiple) {
      jsx = (
        <Menu.Section className="rc-menu-deprecatedsection-list">
          {jsx}
        </Menu.Section>
      );
    }

    return jsx;
  }

  renderApplyButton() {
    const { multiple, applyLabel } = this.props;
    let jsx;

    if (multiple) {
      jsx = (
        <Menu.Actions centered>
          <Button type="text" onClick={this.onApply}>
            {applyLabel}
          </Button>
        </Menu.Actions>
      );
    }

    return jsx;
  }

  render() {
    const {
      multiple,
      title,
      anchor,
      target,
      margin,
      disablePortal,
      inheritWidth,
      width: widthProp,
    } = this.props;
    const menu = this.renderMenu();
    const applyButton = this.renderApplyButton();
    const className = classnames('rc-dropdown-menu', {
      'rc-dropdown-menu-multiple': multiple,
      'rc-dropdown-menu-with-header': title,
    });

    let width;

    if (!inheritWidth) {
      width = widthProp;
    }

    return (
      <Popover
        menu
        title={title}
        closeButton={!!title}
        anchor={anchor}
        ref={c => {
          this.popover = c;
        }}
        width={width}
        inheritTargetWidth={inheritWidth}
        className={className}
        target={target}
        onOpen={this.onOpen}
        onClose={this.onClose}
        margin={margin}
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
