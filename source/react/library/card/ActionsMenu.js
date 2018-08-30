import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon/Icon';
import DropdownMenu from '../dropdown/DropdownMenu';
import { TooltipStickyArea } from '../tooltips/Tooltip';

const propTypes = {
  message: PropTypes.string,
  menuToggleIcon: PropTypes.string,
  menuOptions: PropTypes.arrayOf(PropTypes.object),
  onOptionClick: PropTypes.func,
};

const defaultProps = {
  message: '',
  menuToggleIcon: 'kebab',
  menuOptions: [],
  onOptionClick: null,
};

class CardActionsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: !!props.message,
    };

    this.onTooltipClose = this.onTooltipClose.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
  }

  onMenuOpen() {
    this.setState({ tooltipOpen: false });
  }

  onTooltipClose() {
    this.setState({ tooltipOpen: false });
  }

  render() {
    const { tooltipOpen } = this.state;
    const { menuOptions, menuToggleIcon, message, onOptionClick } = this.props;
    let menu;

    if (menuOptions.length > 0) {
      // TODO: This should render a button element or an anchor if its for navigation
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      /* eslint-disable jsx-a11y/anchor-is-valid */
      let target = (
        <a>
          <Icon type={menuToggleIcon} height="16px" width="16px" />
        </a>
      );

      let selected = menuOptions.filter(o => o.selected);

      if (selected.length) {
        selected = selected[0].id;
      }

      if (message) {
        target = (
          <TooltipStickyArea
            onClose={this.onTooltipClose}
            open={tooltipOpen}
            anchor="bottom"
            tooltip={message}
          >
            {target}
          </TooltipStickyArea>
        );
      }

      menu = (
        <DropdownMenu
          size="tiny"
          anchor="bottom right"
          target={target}
          options={menuOptions}
          selected={selected}
          onOpen={this.onMenuOpen}
          onChange={onOptionClick}
        />
      );
    }

    return <div className="rc-card-action">{menu}</div>;
  }
}

CardActionsMenu.propTypes = propTypes;
CardActionsMenu.defaultProps = defaultProps;

export default CardActionsMenu;
