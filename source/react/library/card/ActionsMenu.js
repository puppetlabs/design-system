import React from 'react';
import Icon from '../Icon';
import DropdownMenu from '../dropdown/DropdownMenu';
import { TooltipStickyArea } from '../tooltips/Tooltip';

const propTypes = {
  message: React.PropTypes.string,
  menuToggleIcon: React.PropTypes.string,
  menuOptions: React.PropTypes.array,
  onOptionClick: React.PropTypes.func,
};

const defaultProps = {
  message: '',
  menuToggleIcon: 'kebab',
  menuOptions: [],
  onOptionClick: () => {},
};

class CardActionsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onTooltipClose = this.onTooltipClose.bind(this);

    this.state = {};
  }

  onTooltipClose() {
    this.setState({ tooltipOpen: false });
  }

  render() {
    let menu;

    if (this.props.menuOptions.length > 0) {
      let target = (
        <a>
          <Icon type={ this.props.menuToggleIcon } height="16px" width="16px" />
        </a>
      );

      let selected = this.props.menuOptions.filter(o => o.selected);

      if (selected.length) {
        selected = selected[0].id;
      }

      if (this.props.message && this.state.tooltipOpen !== false) {
        target = (
          <TooltipStickyArea
            onClose={ this.onTooltipClose }
            anchor="bottom"
            tooltip={ this.props.message }
          >
            { target }
          </TooltipStickyArea>
        );
      }

      menu = (
        <DropdownMenu
          size="tiny"
          anchor="bottom right"
          target={ target }
          options={ this.props.menuOptions }
          selected={ selected }
          onChange={ this.props.onOptionClick }
        />
      );
    }

    return (
      <div className="rc-card-action" >
        { menu }
      </div>
    );
  }
}

CardActionsMenu.propTypes = propTypes;
CardActionsMenu.defaultProps = defaultProps;

export default CardActionsMenu;
